import { AppShell } from '@/components/shared/app-shell';
import { CommunityChallenges } from '@/components/community/community-challenges';
import { StudyGroups } from '@/components/community/study-groups';
import { AuthGuard } from '@/components/shared/auth-guard';

export default function CommunityPage() {
  return (
    <AuthGuard>
      <AppShell>
        <div className="grid gap-6 lg:grid-cols-2">
            <CommunityChallenges />
            <StudyGroups />
        </div>
      </AppShell>
    </AuthGuard>
  );
}
