'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Flame } from 'lucide-react';
import { useProgress } from '@/hooks/use-progress';
import { Skeleton } from '../ui/skeleton';

export function StudyStreak() {
    const { progress, isLoading } = useProgress();

    return (
        <Card className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-primary" />
                <span>Study Streak</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                {isLoading && (
                    <div className='flex flex-col items-center gap-2'>
                        <Skeleton className="h-16 w-20" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                )}
                {!isLoading && (
                    <>
                        <p className="text-6xl font-bold">{progress?.currentStreak ?? 0}</p>
                        <p className="text-muted-foreground">days in a row!</p>
                    </>
                )}
            </CardContent>
        </Card>
    )
}
