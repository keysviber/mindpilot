// SummarizeUploadedDocuments.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing uploaded documents and lecture notes.
 *
 * - summarizeDocuments - A function that accepts documents and lecture notes, then summarizes the key concepts.
 * - SummarizeDocumentsInput - The input type for the summarizeDocuments function.
 * - SummarizeDocumentsOutput - The return type for the summarizeDocuments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDocumentsInputSchema = z.object({
  documents: z.string().describe('The text content of the documents to summarize.'),
  lectureNotes: z.string().describe('The text content of the lecture notes to summarize.'),
});

export type SummarizeDocumentsInput = z.infer<typeof SummarizeDocumentsInputSchema>;

const SummarizeDocumentsOutputSchema = z.object({
  summary: z.string().describe('A summary of the key concepts from the documents and lecture notes.'),
  progress: z.string().describe('Progress towards generating the requested summary.'),
});

export type SummarizeDocumentsOutput = z.infer<typeof SummarizeDocumentsOutputSchema>;

export async function summarizeDocuments(input: SummarizeDocumentsInput): Promise<SummarizeDocumentsOutput> {
  return summarizeDocumentsFlow(input);
}

const summarizeDocumentsPrompt = ai.definePrompt({
  name: 'summarizeDocumentsPrompt',
  input: {schema: SummarizeDocumentsInputSchema},
  output: {schema: SummarizeDocumentsOutputSchema},
  prompt: `You are an expert summarizer, skilled at distilling key information from documents and lecture notes.

  Summarize the following documents and lecture notes, focusing on the most important concepts. If the lecture notes can improve on the current summary, do so.

  Documents: {{{documents}}}

  Lecture Notes: {{{lectureNotes}}}

  Summary:`,
});

const summarizeDocumentsFlow = ai.defineFlow(
  {
    name: 'summarizeDocumentsFlow',
    inputSchema: SummarizeDocumentsInputSchema,
    outputSchema: SummarizeDocumentsOutputSchema,
  },
  async input => {
    const {output} = await summarizeDocumentsPrompt({
      ...input,
    });
    return {
      ...output,
      progress: 'Generated a short summary of the provided documents and lecture notes.',
    } as SummarizeDocumentsOutput;
  }
);
