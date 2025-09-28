import { AppShell } from '@/components/shared/app-shell';
import { CommunityChallenges } from '@/components/community/community-challenges';
import { StudyGroups } from '@/components/community/study-groups';

export default function CommunityPage() {
  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-2">
          <CommunityChallenges />
          <StudyGroups />
      </div>
    </AppShell>
  );
}
