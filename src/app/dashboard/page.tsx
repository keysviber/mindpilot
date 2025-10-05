import { AppShell } from '@/components/shared/app-shell';
import { ProgressTracker } from '@/components/home/progress-tracker';
import { QuickNotes } from '@/components/home/quick-notes';
import { WeeklyReport } from '@/components/home/weekly-report';
import { UpcomingDeadlines } from '@/components/home/upcoming-deadlines';
import { AuthGuard } from '@/components/shared/auth-guard';
import { StudyTipDialog } from '@/components/home/study-tip-dialog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Flame } from 'lucide-react';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <AppShell>
        <StudyTipDialog />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <ProgressTracker />
            <QuickNotes />
          </div>
          <div className="space-y-6">
             <Card className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-primary" />
                    <span>Study Streak</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-6xl font-bold">5</p>
                    <p className="text-muted-foreground">days in a row!</p>
                </CardContent>
            </Card>
            <WeeklyReport />
            <UpcomingDeadlines />
          </div>
        </div>
      </AppShell>
    </AuthGuard>
  );
}
