import { AppShell } from '@/components/shared/app-shell';
import { ProgressTracker } from '@/components/home/progress-tracker';
import { QuickNotes } from '@/components/home/quick-notes';
import { WeeklyReport } from '@/components/home/weekly-report';
import { UpcomingDeadlines } from '@/components/home/upcoming-deadlines';
import { AuthGuard } from '@/components/shared/auth-guard';
import { StudyTipDialog } from '@/components/home/study-tip-dialog';
import { StudyStreak } from '@/components/dashboard/study-streak';

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
             <StudyStreak />
            <WeeklyReport />
            <UpcomingDeadlines />
          </div>
        </div>
      </AppShell>
    </AuthGuard>
  );
}
