import { AppShell } from '@/components/shared/app-shell';
import { PomodoroTimer } from '@/components/focus/pomodoro-timer';
import { FocusMusic } from '@/components/focus/focus-music';
import { BlockDistractions } from '@/components/focus/block-distractions';

export default function FocusPage() {
  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PomodoroTimer />
        </div>
        <div className="space-y-6">
          <FocusMusic />
          <BlockDistractions />
        </div>
      </div>
    </AppShell>
  );
}
