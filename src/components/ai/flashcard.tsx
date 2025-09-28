'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw } from 'lucide-react';

type FlashcardProps = {
  question: string;
  answer: string;
};

export function Flashcard({ question, answer }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full h-full aspect-[3/2] perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
      <div
        className={cn(
          'relative w-full h-full transform-style-3d transition-transform duration-700',
          isFlipped ? 'rotate-y-180' : ''
        )}
      >
        {/* Front of the card */}
        <Card className="absolute w-full h-full backface-hidden flex flex-col justify-center items-center p-6">
          <CardContent className="text-center">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Question</p>
            <p className="mt-2 text-lg font-medium">{question}</p>
          </CardContent>
        </Card>

        {/* Back of the card */}
        <Card className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col justify-center items-center p-6 bg-secondary">
          <CardContent className="text-center">
            <p className="text-xs text-foreground font-semibold uppercase tracking-wider">Answer</p>
            <p className="mt-2 text-lg font-medium">{answer}</p>
          </CardContent>
        </Card>
      </div>
      <p className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
        <RotateCcw className="w-3 h-3"/> Click card to flip
      </p>
    </div>
  );
}

// Add these utility classes to a global stylesheet or tailwind.config.js if you use them frequently.
// For simplicity, we can also just use CSS-in-JS or a style tag if it's a one-off.
// We'll add a style tag to the layout for this.
// Or we can add custom plugin in tailwind config.
// The easiest is to use a global style. Let's add it to globals.css.
// .perspective-1000 { perspective: 1000px; }
// .transform-style-3d { transform-style: preserve-3d; }
// .rotate-y-180 { transform: rotateY(180deg); }
// .backface-hidden { -webkit-backface-visibility: hidden; backface-visibility: hidden; }

// Let's create a new file for this to be clean.
// No, the instruction is to put everything into one big file if it's small.
// Let's put this in globals.css.
// On second thought, let's use tailwind arbitrary values to keep it self-contained.
// This is not possible for transform-style and perspective.
// I'll create a style tag in the component. It's not ideal, but it's self-contained.
// Actually, it's better to just use the classes and assume they will be added to tailwind config.
// Let's add them to globals.css
