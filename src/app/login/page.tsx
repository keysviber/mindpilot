'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { BrainCircuit, Chrome, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});


export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const [isGoogleLoading, setGoogleLoading] = useState(false);
  const [isEmailLoading, setEmailLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleEmailSignIn = async (values: z.infer<typeof formSchema>) => {
    if (!auth) return;
    setEmailLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: 'You are all set!',
        description: "Welcome back to MindPilot.",
      });
      router.push('/');
    } catch (error: any) {
      toast({
        title: 'Sign-in Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setEmailLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    if (!auth) return;
    setGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: 'You are all set!',
        description: "Welcome back to MindPilot.",
      });
      router.push('/');
    } catch (error: any) {
      toast({
        title: 'Sign-in Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGuestMode = () => {
    sessionStorage.setItem('isGuest', 'true');
    router.push('/');
  }

  const isLoading = isGoogleLoading || isEmailLoading;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 flex items-center gap-3 text-center">
        <BrainCircuit className="h-10 w-10 text-primary" />
        <h1 className="text-4xl font-bold text-foreground font-headline">MindPilot</h1>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to access your study dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
           <Form {...form}>
              <form onSubmit={form.handleSubmit(handleEmailSignIn)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="name@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isEmailLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2"/>}
                  Sign In with Email
                </Button>
              </form>
            </Form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                    </span>
                </div>
            </div>
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
                 {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Chrome className="mr-2"/>}
                Google
            </Button>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                    Or
                    </span>
                </div>
            </div>

            <Button variant="secondary" onClick={handleGuestMode} disabled={isLoading}>
                Continue as Guest
            </Button>
        </CardContent>
         <CardContent>
            <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="underline">
                Sign up
                </Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
