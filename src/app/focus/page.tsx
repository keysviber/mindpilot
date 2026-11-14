import { AppShell } from "@/components/shared/app-shell";
import { PomodoroTimer } from "@/components/focus/pomodoro-timer";
import { AiFocusMusic } from "@/components/focus/ai-focus-music";
import { BlockDistractions } from "@/components/focus/block-distractions";
import { AuthGuard } from "@/components/shared/auth-guard";

export default function FocusPage() {
  return (
    <AuthGuard>
      <AppShell>
        <div className="page-intro">
          <div className="eyebrow">
            <span className="status-dot" />A LITTLE SPACE TO THINK
          </div>
          <h1>Find your happy focus.</h1>
          <p>
            One task, one calm session, one small win. Take a breath and let the
            rest of the world wait.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 animate-fade-in-up">
            <PomodoroTimer />
          </div>
          <div className="space-y-6">
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              <AiFocusMusic />
            </div>
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <BlockDistractions />
            </div>
          </div>
        </div>
      </AppShell>
    </AuthGuard>
  );
}
