'use client';
import Link from 'next/link';
import { BrainCircuit, Bell, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser, useAuth } from '@/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { Badge } from '../ui/badge';

const notifications = [
    { title: "New Study Tip!", description: "A new personalized study tip is available for you.", time: "2m ago" },
    { title: "Challenge Complete!", description: "You've completed the 'Weekend Warrior' challenge.", time: "1h ago" },
    { title: "Focus Session", description: "You completed a 25-minute focus session.", time: "3h ago" },
];

export function AppHeader() {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    if (auth) {
      await auth.signOut();
      sessionStorage.removeItem('isGuest');
      router.push('/login');
    }
  };
  
  const getInitials = (email?: string | null) => {
    if (!email) return 'U';
    return email.substring(0, 2).toUpperCase();
  }

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <BrainCircuit className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground font-headline">MindPilot</h1>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
             <>
              <Button asChild variant="ghost">
                <Link href="/community">
                  <Users className="mr-2" />
                  Community
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <Badge className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0 text-xs" variant="destructive">
                            {notifications.length}
                        </Badge>
                        <span className="sr-only">Notifications</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" align="end">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications.map((n, i) => (
                        <DropdownMenuItem key={i} className="flex flex-col items-start gap-1">
                           <div className="flex justify-between w-full">
                             <p className="font-medium">{n.title}</p>
                             <p className="text-xs text-muted-foreground">{n.time}</p>
                           </div>
                           <p className="text-sm text-muted-foreground whitespace-normal">{n.description}</p>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.photoURL ?? ''} alt={user.email ?? ''} />
                      <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">My Account</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                   <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/community">Community</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
