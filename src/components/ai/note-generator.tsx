'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { summarizeDocuments, type SummarizeDocumentsOutput } from '@/ai/flows/summarize-uploaded-documents';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

const formSchema = z.object({
  documents: z.string().min(50, 'Please provide more content for a better summary.'),
  lectureNotes: z.string().optional(),
});

export function NoteGenerator() {
  const [result, setResult] = useState<SummarizeDocumentsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documents: '',
      lectureNotes: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    try {
      const summaryResult = await summarizeDocuments(values);
      setResult(summaryResult);
    } catch (error) {
      console.error('Error generating summary:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate summary. Please try again.',
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
          <CardTitle>AI Note Summarizer</CardTitle>
          <CardDescription>
            Paste your documents and lecture notes to get a concise summary of key concepts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="documents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Documents / Textbook Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste your main study material here..." {...field} rows={10} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lectureNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lecture Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Add your lecture notes to refine the summary..." {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <Sparkles className="mr-2" />}
                Generate Summary
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="lg:sticky top-8">
        <CardHeader>
          <CardTitle>Generated Summary</CardTitle>
          <CardDescription>
            Your AI-powered summary will appear below.
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          )}
          {result ? (
            <p>{result.summary}</p>
          ) : (
            !isLoading && <p className="text-muted-foreground">The result will be shown here.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
