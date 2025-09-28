import { AppHeader } from '@/components/shared/app-header';
import { MainNav } from '@/components/shared/main-nav';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <div className="border-b">
        <div className="container mx-auto px-4">
          <MainNav />
        </div>
      </div>
      <main className="flex-1 bg-background">
        <div className="container mx-auto p-4 py-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
