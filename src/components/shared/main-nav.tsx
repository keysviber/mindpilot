
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Bot, Target, Users } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/ai', label: 'AI Tools', icon: Bot },
  { href: '/focus', label: 'Focus', icon: Target },
  { href: '/community', label: 'Community', icon: Users },
];

export function MobileNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex flex-col items-center gap-1 text-xs font-medium transition-colors hover:text-primary py-2 px-2 rounded-md w-20',
            pathname === item.href
              ? 'text-primary bg-primary/10'
              : 'text-muted-foreground'
          )}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
