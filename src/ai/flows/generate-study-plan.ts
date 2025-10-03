'use server';
/**
 * @fileOverview AI-powered study plan generator.
 *
 * - generateStudyPlan - A function that generates a personalized study plan.
 * - GenerateStudyPlanInput - The input type for the generateStudyPlan function.
 * - GenerateStudyPlanOutput - The return type for the generateStudyPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStudyPlanInputSchema = z.object({
  topics: z.string().describe('The topics or subjects the user wants to study.'),
  duration: z.number().describe('The total number of days the user has to study.'),
  learningStyle: z.string().describe('The user\'s preferred learning style (e.g., visual, auditory, hands-on).'),
});
export type GenerateStudyPlanInput = z.infer<typeof GenerateStudyPlanInputSchema>;

const GenerateStudyPlanOutputSchema = z.object({
    plan: z.array(z.object({
        day: z.number(),
        topic: z.string(),
        activity: z.string(),
        details: z.string(),
    })).describe('The detailed study plan.')
});
export type GenerateStudyPlanOutput = z.infer<typeof GenerateStudyPlanOutputSchema>;

export async function generateStudyPlan(input: GenerateStudyPlanInput): Promise<GenerateStudyPlanOutput> {
  return generateStudyPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStudyPlanPrompt',
  input: {schema: GenerateStudyPlanInputSchema},
  output: {schema: GenerateStudyPlanOutputSchema},
  prompt: `You are an expert academic advisor who creates personalized study plans.

  Based on the following information, create a detailed, day-by-day study plan. The plan should be tailored to the user's preferred learning style.

  Topics: {{{topics}}}
  Duration (days): {{{duration}}}
  Learning Style: {{{learningStyle}}}

  Generate a structured plan. For each day, specify the topic, a primary activity that aligns with their learning style, and some brief details.
  `,
});

const generateStudyPlanFlow = ai.defineFlow(
  {
    name: 'generateStudyPlanFlow',
    inputSchema: GenerateStudyPlanInputSchema,
    outputSchema: GenerateStudyPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
