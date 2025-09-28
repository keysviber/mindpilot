import { AppShell } from '@/components/shared/app-shell';
import { ProgressTracker } from '@/components/home/progress-tracker';
import { StudyTips } from '@/components/home/study-tips';
import { QuickNotes } from '@/components/home/quick-notes';
import { WeeklyReport } from '@/components/home/weekly-report';
import { UpcomingDeadlines } from '@/components/home/upcoming-deadlines';
import { AuthGuard } from '@/components/shared/auth-guard';

export default function Home() {
  return (
    <AuthGuard>
      <AppShell>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <ProgressTracker />
            <QuickNotes />
          </div>
          <div className="space-y-6">
            <StudyTips />
            <WeeklyReport />
            <UpcomingDeadlines />
          </div>
        </div>
      </AppShell>
    </AuthGuard>
  );
}
