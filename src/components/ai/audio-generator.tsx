'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateAudioFromNotes, type GenerateAudioFromNotesOutput } from '@/ai/flows/generate-audio-from-notes';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Music, Volume2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

const formSchema = z.object({
  notes: z.string().min(20, 'Please provide more content to generate quality audio.'),
});

export function AudioGenerator() {
  const [result, setResult] = useState<GenerateAudioFromNotesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    try {
      const audioResult = await generateAudioFromNotes(values);
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
        description: 'Failed to generate audio. Please try again.',
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
          <CardTitle>AI Audio Note Generator</CardTitle>
          <CardDescription>
            Paste your notes below, and the AI will convert them into an audio file you can listen to.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Notes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste your notes here..." {...field} rows={15} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <Music className="mr-2" />}
                Generate Audio
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="lg:sticky top-8">
        <Card>
          <CardHeader>
            <CardTitle>Generated Audio</CardTitle>
            <CardDescription>
              Listen to your generated audio notes below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            )}
            {!isLoading && result && result.media && (
                <div className="flex flex-col items-center gap-4">
                    <audio controls className="w-full">
                        <source src={result.media} type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>
                     <p className="text-sm text-muted-foreground">Playback of your generated audio notes.</p>
                </div>
            )}
            {!isLoading && !result && (
              <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg">
                <Volume2 className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground">Your audio will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
