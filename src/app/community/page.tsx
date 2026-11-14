import { AppShell } from "@/components/shared/app-shell";
import { CommunityChallenges } from "@/components/community/community-challenges";
import { StudyGroups } from "@/components/community/study-groups";
import { AuthGuard } from "@/components/shared/auth-guard";

export default function CommunityPage() {
  return (
    <AuthGuard>
      <AppShell>
        <div className="page-intro">
          <div className="eyebrow">
            <span className="status-dot" />
            BETTER, TOGETHER
          </div>
          <h1>Good company. Great progress.</h1>
          <p>
            Find your people, share your momentum, and turn small steps into
            something bigger.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="animate-fade-in-up">
            <CommunityChallenges />
          </div>
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <StudyGroups />
          </div>
        </div>
      </AppShell>
    </AuthGuard>
  );
}
