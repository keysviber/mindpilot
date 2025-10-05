'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '../ui/badge';
import { useProgress } from '@/hooks/use-progress';

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export function PomodoroTimer() {
  const [focusDuration, setFocusDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
  const [isActive, setIsActive] = useState(false);

  const { progress, incrementPomodoros, incrementStreak } = useProgress();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalDuration = useMemo(() => {
    if (mode === 'focus') return focusDuration * 60;
    if (mode === 'shortBreak') return shortBreakDuration * 60;
    return longBreakDuration * 60;
  }, [mode, focusDuration, shortBreakDuration, longBreakDuration]);

  useEffect(() => {
    setTimeLeft(totalDuration);
  }, [totalDuration]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      handleSessionEnd();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);
  
  const handleSessionEnd = () => {
    setIsActive(false);
    if (mode === 'focus') {
      const newCycles = (progress?.pomodoroSessions ?? 0) + 1;
      incrementPomodoros();
      incrementStreak();

      if (newCycles % 4 === 0) {
        setMode('longBreak');
        setTimeLeft(longBreakDuration * 60);
      } else {
        setMode('shortBreak');
        setTimeLeft(shortBreakDuration * 60);
      }
    } else {
      setMode('focus');
      setTimeLeft(focusDuration * 60);
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(false);
    setTimeLeft(totalDuration);
  };
  
  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsActive(false);
    if (newMode === 'focus') setTimeLeft(focusDuration * 60);
    if (newMode === 'shortBreak') setTimeLeft(shortBreakDuration * 60);
    if (newMode === 'longBreak') setTimeLeft(longBreakDuration * 60);
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progressPercentage = (timeLeft / totalDuration) * 100;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="text-2xl">Pomodoro Timer</CardTitle>
         <div className="flex justify-center gap-2 pt-4">
            <Button size="sm" variant={mode === 'focus' ? 'default' : 'outline'} onClick={() => switchMode('focus')}>Focus</Button>
            <Button size="sm" variant={mode === 'shortBreak' ? 'default' : 'outline'} onClick={() => switchMode('shortBreak')}>Short Break</Button>
            <Button size="sm" variant={mode === 'longBreak' ? 'default' : 'outline'} onClick={() => switchMode('longBreak')}>Long Break</Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-64 h-64">
            <svg className="w-full h-full" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r={radius} stroke="hsl(var(--border))" strokeWidth="8" fill="transparent" />
                <circle
                    cx="100" cy="100" r={radius}
                    stroke="hsl(var(--primary))" strokeWidth="8" fill="transparent"
                    strokeLinecap="round" transform="rotate(-90 100 100)"
                    style={{ strokeDasharray: circumference, strokeDashoffset, transition: 'stroke-dashoffset 0.3s linear' }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col justify-center items-center">
                <span className="text-5xl font-bold font-mono tracking-tighter">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
                <Badge variant="secondary" className="mt-2">
                    {mode === 'focus' ? <Brain className="w-3 h-3 mr-1" /> : <Coffee className="w-3 h-3 mr-1" />}
                    {mode === 'focus' ? 'Focus Time' : 'Break Time'}
                </Badge>
            </div>
        </div>
        <div className="flex gap-4 mt-8">
          <Button size="lg" onClick={toggleTimer}>
            {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button size="lg" variant="outline" onClick={resetTimer}>
            <RotateCcw className="mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <p className="text-sm text-muted-foreground">Focus cycles completed: {progress?.pomodoroSessions ?? 0}</p>
        <div className="flex items-center gap-4 text-sm">
            <label htmlFor="focus-duration">Focus:</label>
            <Select value={String(focusDuration)} onValueChange={(v) => { setFocusDuration(Number(v)); if (mode === 'focus') setTimeLeft(Number(v) * 60)}}>
                <SelectTrigger id="focus-duration" className="w-24"><SelectValue/></SelectTrigger>
                <SelectContent>
                    <SelectItem value="15">15 min</SelectItem>
                    <SelectItem value="25">25 min</SelectItem>
                    <SelectItem value="45">45 min</SelectItem>
                    <SelectItem value="50">50 min</SelectItem>
                </SelectContent>
            </Select>
             <label htmlFor="break-duration">Break:</label>
             <Select value={String(shortBreakDuration)} onValueChange={(v) => { setShortBreakDuration(Number(v)); if (mode === 'shortBreak') setTimeLeft(Number(v) * 60)}}>
                <SelectTrigger id="break-duration" className="w-24"><SelectValue/></SelectTrigger>
                <SelectContent>
                    <SelectItem value="5">5 min</SelectItem>
                    <SelectItem value="10">10 min</SelectItem>
                    <SelectItem value="15">15 min</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </CardFooter>
    </Card>
  );
}
