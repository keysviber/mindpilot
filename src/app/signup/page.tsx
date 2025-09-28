'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
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
import { Chrome } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isGoogleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (error: any) {
      toast({
        title: 'Sign-up Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            Join MindPilot to revolutionize your study habits.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isGoogleLoading}>
                 {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Chrome className="mr-2"/>}
                Sign Up with Google
            </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}