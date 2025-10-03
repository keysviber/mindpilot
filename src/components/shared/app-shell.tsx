import { AppHeader } from '@/components/shared/app-header';
import { MobileNav } from '@/components/shared/main-nav';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 bg-background pb-24">
        <div className="container mx-auto p-4 py-6 md:p-8">
          {children}
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex justify-center px-4">
          <MobileNav />
        </div>
      </footer>
    </div>
  );
}
