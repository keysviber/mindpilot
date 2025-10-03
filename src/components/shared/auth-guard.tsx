'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const guestStatus = sessionStorage.getItem('isGuest') === 'true';
    setIsGuest(guestStatus);

    if (!isUserLoading && !user && !guestStatus) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || (!user && !isGuest)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
