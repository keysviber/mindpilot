'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateFocusSound, type GenerateFocusSoundOutput } from '@/ai/flows/generate-focus-sound';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Music, Sparkles, Volume2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

const formSchema = z.object({
  description: z.string().min(5, 'Please provide a longer description.'),
});

export function AiFocusMusic() {
  const [result, setResult] = useState<GenerateFocusSoundOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: 'Lofi beats for studying',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    try {
      const audioResult = await generateFocusSound(values);
      if (audioResult.media) {
        setResult(audioResult);
      } else {
        toast({
          title: 'No Audio Generated',
          description: 'The AI could not generate audio from the provided text. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error generating audio:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate focus audio. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5 text-primary" />
          <span>AI Focus Music</span>
        </CardTitle>
        <CardDescription>Describe the sound you want to hear.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="e.g., Gentle rain on a window" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <Sparkles className="mr-2" />}
              Generate Audio
            </Button>
          </form>
        </Form>

        <div className="mt-6">
            {isLoading && (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
              </div>
            )}
            {!isLoading && result && result.media && (
                <div className="flex flex-col items-center gap-4">
                    <audio controls autoPlay className="w-full">
                        <source src={result.media} type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
            {!isLoading && !result && (
              <div className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-lg">
                <Volume2 className="h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">AI audio will appear here</p>
              </div>
            )}
          </div>

      </CardContent>
    </Card>
  );
}
