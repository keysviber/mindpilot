'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateFlashcards, type GenerateFlashcardsOutput } from '@/ai/flows/generate-flashcards-from-study-materials';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Layers } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Flashcard as FlashcardComponent } from './flashcard';
import { Skeleton } from '../ui/skeleton';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { Input } from '../ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';

type Flashcard = {
  front: string;
  back: string;
};

type SavedFlashcardSet = {
  id: string;
  topic: string;
  flashcards: Flashcard[];
  userId?: string;
  creationDate: string;
};

const formSchema = z.object({
  studyMaterials: z.string().min(100, 'Please provide more content to generate quality flashcards.'),
  topic: z.string().min(3, 'Please provide a topic for this flashcard set.'),
});

export function FlashcardGenerator() {
  const [result, setResult] = useState<GenerateFlashcardsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const flashcardSetsCollectionRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'users', user.uid, 'flashcards');
  }, [firestore, user]);

  const { data: savedSets, isLoading: areSetsLoading } = useCollection<SavedFlashcardSet>(flashcardSetsCollectionRef);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studyMaterials: '',
      topic: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    try {
      const flashcardResult = await generateFlashcards({ studyMaterials: values.studyMaterials });
      if (flashcardResult.flashcards && flashcardResult.flashcards.length > 0) {
        setResult(flashcardResult);
        
        if (firestore && user) {
          const newSet = {
            topic: values.topic,
            flashcards: flashcardResult.flashcards.map(fc => ({ front: fc.question, back: fc.answer })),
            userId: user.uid,
            creationDate: new Date().toISOString(),
          };
          await addDocumentNonBlocking(collection(firestore, 'users', user.uid, 'flashcards'), newSet);
          toast({
            title: 'Flashcards Saved!',
            description: `A new set for "${values.topic}" has been saved to your account.`,
          });
        }
        
      } else {
        toast({
          title: 'No Flashcards Generated',
          description: 'The AI could not generate flashcards from the provided text. Please try with different content.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error generating flashcards:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate flashcards. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle>AI Flashcard Generator</CardTitle>
          <CardDescription>
            Paste your study materials, give it a topic, and the AI will create flashcards and save them to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Flashcard Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Cell Biology" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="studyMaterials"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Study Materials</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste your notes, article, or textbook chapter here..." {...field} rows={15} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading || isUserLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <Layers className="mr-2" />}
                Generate & Save Flashcards
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="lg:sticky top-8">
          <CardHeader>
            <CardTitle>Generated Flashcards</CardTitle>
            <CardDescription>
              Review your new set of flashcards below. They are automatically saved.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex justify-center items-center h-64">
                <div className="w-full max-w-sm space-y-4">
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </div>
              </div>
            )}
            {!isLoading && result && result.flashcards.length > 0 && (
              <Carousel className="w-full max-w-sm mx-auto" opts={{ loop: true }}>
                <CarouselContent>
                  {result.flashcards.map((card, index) => (
                    <CarouselItem key={index}>
                      <FlashcardComponent question={card.question} answer={card.answer} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            )}
            {!isLoading && !result && (
              <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
                <Layers className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground">Your flashcards will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Saved Flashcard Sets</CardTitle>
                <CardDescription>Your saved flashcard sets.</CardDescription>
            </CardHeader>
            <CardContent>
                {areSetsLoading && <p>Loading sets...</p>}
                {!areSetsLoading && (!savedSets || savedSets.length === 0) && <p className="text-sm text-muted-foreground text-center">No flashcard sets saved yet.</p>}
                <Accordion type="single" collapsible className="w-full">
                    {savedSets?.map(set => (
                        <AccordionItem value={`set-${set.id}`} key={set.id}>
                            <AccordionTrigger>{set.topic} ({set.flashcards.length} cards)</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-2">
                                    {set.flashcards.map((card, index) => (
                                        <div key={index} className="p-2 bg-muted/50 rounded-md text-sm">
                                            <p><strong>Q:</strong> {card.front}</p>
                                            <p><strong>A:</strong> {card.back}</p>
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
