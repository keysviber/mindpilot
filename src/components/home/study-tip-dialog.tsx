'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lightbulb, Loader2 } from 'lucide-react';
import { achievements } from '@/lib/data';
import { generatePersonalizedStudyTip } from '@/ai/flows/generate-personalized-study-tip';
import { useToast } from '@/hooks/use-toast';

export function StudyTipDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [tip, setTip] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Prevent dialog from opening on every navigation
    const hasOpened = sessionStorage.getItem('studyTipDialogOpened');
    if (!hasOpened) {
      setIsOpen(true);
      sessionStorage.setItem('studyTipDialogOpened', 'true');
    }

    const fetchTip = async () => {
      setIsLoading(true);
      try {
        // Extract performance data
        const performanceData = {
          streak: achievements.find(a => a.title.includes('Streak'))?.current || 0,
          pomodoroSessions: achievements.find(a => a.title.includes('Pomodoro'))?.current || 0,
          aiSummaries: achievements.find(a => a.title.includes('Learner'))?.current || 0,
        };

        const result = await generatePersonalizedStudyTip(performanceData);
        if (result.tip) {
          setTip(result.tip);
        } else {
          setTip("Keep up the great work! Consistency is key to success.");
        }
      } catch (error) {
        console.error("Failed to generate personalized tip:", error);
        setTip("Welcome back! Try to complete one focus session today to build your streak.");
        toast({
          title: 'Could not fetch AI tip',
          description: 'Showing a default tip instead.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTip();
  }, [toast]);

  // Don't render the dialog if it's not supposed to be open
  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            Your Personalized Tip!
          </DialogTitle>
          <DialogDescription>
            Here is some advice based on your recent activity.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Generating your tip...</span>
            </div>
          ) : (
            <p className="text-lg leading-relaxed text-center font-medium">"{tip}"</p>
          )}
        </div>
        <Button onClick={() => setIsOpen(false)} className="w-full">
          Got it, thanks!
        </Button>
      </DialogContent>
    </Dialog>
  );
}
