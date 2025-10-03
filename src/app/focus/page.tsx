import { AppShell } from '@/components/shared/app-shell';
import { PomodoroTimer } from '@/components/focus/pomodoro-timer';
import { AiFocusMusic } from '@/components/focus/ai-focus-music';
import { BlockDistractions } from '@/components/focus/block-distractions';
import { AuthGuard } from '@/components/shared/auth-guard';

export default function FocusPage() {
  return (
    <AuthGuard>
      <AppShell>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 animate-fade-in-up">
            <PomodoroTimer />
          </div>
          <div className="space-y-6">
            <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <AiFocusMusic />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <BlockDistractions />
            </div>
          </div>
        </div>
      </AppShell>
    </AuthGuard>
  );
}
