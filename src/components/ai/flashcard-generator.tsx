'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateFlashcards, type GenerateFlashcardsOutput } from '@/ai/flows/generate-flashcards-from-study-materials';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Layers } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Flashcard } from './flashcard';
import { Skeleton } from '../ui/skeleton';

const formSchema = z.object({
  studyMaterials: z.string().min(100, 'Please provide more content to generate quality flashcards.'),
});

export function FlashcardGenerator() {
  const [result, setResult] = useState<GenerateFlashcardsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studyMaterials: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    try {
      const flashcardResult = await generateFlashcards(values);
      if (flashcardResult.flashcards && flashcardResult.flashcards.length > 0) {
        setResult(flashcardResult);
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
            Paste your study materials below, and the AI will create flashcards for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <Layers className="mr-2" />}
                Generate Flashcards
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="lg:sticky top-8">
        <Card>
          <CardHeader>
            <CardTitle>Generated Flashcards</CardTitle>
            <CardDescription>
              Review your new set of flashcards below. Click to flip.
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
                      <Flashcard question={card.question} answer={card.answer} />
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
      </div>
    </div>
  );
}
