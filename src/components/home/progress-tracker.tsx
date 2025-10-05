'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/hooks/use-progress";
import { TrendingUp, Flame, Trophy, Zap } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export function ProgressTracker() {
    const { progress, achievementGoals, isLoading } = useProgress();

    const achievements = [
        { 
            icon: Flame, 
            title: "5-Day Streak", 
            description: "Studied for 5 days in a row.", 
            current: progress?.currentStreak ?? 0, 
            total: achievementGoals.streak,
            key: 'currentStreak'
        },
        { 
            icon: Trophy, 
            title: "Pomodoro Master", 
            description: "Completed 50 focus sessions.", 
            current: progress?.pomodoroSessions ?? 0, 
            total: achievementGoals.pomodoros,
            key: 'pomodoroSessions'
        },
        { 
            icon: Zap, 
            title: "Quick Learner", 
            description: "Generated 10 AI summaries.", 
            current: progress?.aiSummaries ?? 0,
            total: achievementGoals.aiSummaries,
            key: 'aiSummaries'
        },
    ];

  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span>My Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading && (
            <div className="space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-2 w-full" />
                </div>
                 <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-2 w-full" />
                </div>
            </div>
        )}
        {!isLoading && achievements.map((achievement, index) => {
          const percentage = (achievement.current / achievement.total) * 100;
          return (
            <div 
              key={achievement.title} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <achievement.icon className="h-5 w-5 text-muted-foreground" />
                  <p className="font-medium">{achievement.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {achievement.current}/{achievement.total}
                </p>
              </div>
              <Progress value={percentage} aria-label={`${achievement.title} progress`} />
              <p className="text-xs text-muted-foreground mt-1.5">{achievement.description}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
