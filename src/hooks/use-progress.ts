'use client';

import { useCallback } from 'react';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc, setDoc, serverTimestamp, increment } from 'firebase/firestore';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from './use-toast';

export type Progress = {
    id: string;
    userId: string;
    currentStreak: number;
    longestStreak: number;
    lastStudyDate: string; // ISO date string
    pomodoroSessions: number;
    aiSummaries: number;
    achievements: string[];
}

const achievementGoals = {
    streak: 5,
    pomodoros: 50,
    aiSummaries: 10,
}

export function useProgress() {
    const { user } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();

    const progressRef = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        // Using user.uid as the document ID for a 1-to-1 relationship.
        return doc(firestore, 'users', user.uid, 'progress_tracking', user.uid);
    }, [firestore, user]);

    const { data: progress, isLoading, error } = useDoc<Progress>(progressRef);

    const checkAndCreateProgressDoc = useCallback(async () => {
        if (!progress && user && firestore && progressRef && !isLoading) {
             const today = new Date().toISOString().split('T')[0];
            const newProgress: Omit<Progress, 'id'> = {
                userId: user.uid,
                currentStreak: 0,
                longestStreak: 0,
                lastStudyDate: today,
                pomodoroSessions: 0,
                aiSummaries: 0,
                achievements: [],
            };
            await setDoc(progressRef, newProgress);
        }
    }, [progress, user, firestore, progressRef, isLoading]);

    // Check and create document if it doesn't exist
    if (user && !isLoading && !progress && !error) {
        checkAndCreateProgressDoc();
    }
    
    const checkAchievement = useCallback((
        updatedProgress: Progress, 
        achievement: string, 
        condition: boolean
    ) => {
        if (condition && !updatedProgress.achievements.includes(achievement)) {
            const newAchievements = [...updatedProgress.achievements, achievement];
            updateDocumentNonBlocking(progressRef!, { achievements: newAchievements });
            toast({
                title: "Achievement Unlocked!",
                description: `You've earned the ${achievement} badge!`,
            });
            return newAchievements;
        }
        return updatedProgress.achievements;
    }, [progressRef, toast]);


    const incrementStreak = useCallback(() => {
        if (!progress || !progressRef) return;
        
        const today = new Date().toISOString().split('T')[0];
        const lastStudy = progress.lastStudyDate;

        if (today === lastStudy) return; // Already studied today

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        let newStreak = progress.currentStreak;
        if (lastStudy === yesterdayStr) {
            newStreak += 1; // It's consecutive
        } else {
            newStreak = 1; // Streak was broken
        }

        const newLongest = Math.max(newStreak, progress.longestStreak);

        const updatedFields = {
            currentStreak: newStreak,
            longestStreak: newLongest,
            lastStudyDate: today
        };
        updateDocumentNonBlocking(progressRef, updatedFields);
        
        // Check for streak achievement
        const updatedProgressForAchievements = { ...progress, ...updatedFields };
        checkAchievement(updatedProgressForAchievements, "5-Day Streak", newStreak >= achievementGoals.streak);
        
    }, [progress, progressRef, checkAchievement]);
    
    const incrementPomodoros = useCallback(() => {
        if (!progress || !progressRef) return;
        updateDocumentNonBlocking(progressRef, { pomodoroSessions: increment(1) });
        incrementStreak();
        
        const updatedProgress = { ...progress, pomodoroSessions: progress.pomodoroSessions + 1 };
        checkAchievement(updatedProgress, "Pomodoro Master", updatedProgress.pomodoroSessions >= achievementGoals.pomodoros);

    }, [progress, progressRef, incrementStreak, checkAchievement]);

    const incrementAiSummaries = useCallback(() => {
        if (!progress || !progressRef) return;
        updateDocumentNonBlocking(progressRef, { aiSummaries: increment(1) });
        incrementStreak();
        
        const updatedProgress = { ...progress, aiSummaries: progress.aiSummaries + 1 };
        checkAchievement(updatedProgress, "Quick Learner", updatedProgress.aiSummaries >= achievementGoals.aiSummaries);

    }, [progress, progressRef, incrementStreak, checkAchievement]);

    return { 
        progress, 
        isLoading: isLoading && !progress, 
        error, 
        incrementPomodoros, 
        incrementAiSummaries,
        incrementStreak,
        achievementGoals
    };
}
