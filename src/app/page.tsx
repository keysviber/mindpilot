
import { Button } from '@/components/ui/button';
import { BrainCircuit, Book, Layers, Music, Route, Target, Users } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Book,
    title: 'AI Note Summarizer',
    description: 'Turn long documents and lecture notes into concise summaries.',
  },
  {
    icon: Layers,
    title: 'Flashcard Generator',
    description: 'Automatically create flashcards from your study materials.',
  },
  {
    icon: Music,
    title: 'Audio Notes',
    description: 'Convert your notes into audio files to listen on the go.',
  },
  {
    icon: Target,
    title: 'Pomodoro Timer',
    description: 'Stay focused with the classic time management technique.',
  },
  {
    icon: Route,
    title: 'Personalized Study Plans',
    description: 'Get a custom study schedule tailored to your needs.',
  },
  {
    icon: Users,
    title: 'Community Challenges',
    description: 'Join group challenges and stay motivated with peers.',
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <BrainCircuit className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground font-headline">MindPilot</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/community">Community</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 md:py-32 lg:py-40 text-center animate-fade-in-up">
          <div className="container">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground font-headline">
              The Ultimate AI Study Companion
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              MindPilot uses AI to streamline your learning, from summarizing notes to creating personalized study plans. Focus smarter, not harder.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/signup">Get Started for Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-28 bg-secondary">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Features to Supercharge Your Studies</h2>
              <p className="mt-4 text-muted-foreground">
                Everything you need to stay organized, focused, and ahead of the curve.
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="rounded-lg border bg-card p-6 text-center shadow-sm animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MindPilot. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
