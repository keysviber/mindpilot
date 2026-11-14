import { AppShell } from "@/components/shared/app-shell";
import { ProgressTracker } from "@/components/home/progress-tracker";
import { QuickNotes } from "@/components/home/quick-notes";
import { WeeklyReport } from "@/components/home/weekly-report";
import { UpcomingDeadlines } from "@/components/home/upcoming-deadlines";
import { AuthGuard } from "@/components/shared/auth-guard";

import { StudyStreak } from "@/components/dashboard/study-streak";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <AppShell>
        <div className="page-intro">
          <div className="eyebrow">
            <span className="status-dot" />
            MAKE ROOM FOR YOUR NEXT BIG IDEA
          </div>
          <h1>Your personal launchpad.</h1>
          <p>
            Keep your notes, plans, and progress in one happy place. A little
            organization goes a long way.
          </p>
        </div>

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
