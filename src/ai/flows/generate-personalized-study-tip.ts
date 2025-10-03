'use server';
/**
 * @fileOverview AI-powered personalized study tip generator.
 *
 * - generatePersonalizedStudyTip - A function that generates a personalized study tip based on performance data.
 * - GeneratePersonalizedStudyTipInput - The input type for the function.
 * - GeneratePersonalizedStudyTipOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedStudyTipInputSchema = z.object({
  streak: z.number().describe('The user\'s current study streak in days.'),
  pomodoroSessions: z.number().describe('The number of Pomodoro sessions completed.'),
  aiSummaries: z.number().describe('The number of AI summaries generated.'),
});
export type GeneratePersonalizedStudyTipInput = z.infer<typeof GeneratePersonalizedStudyTipInputSchema>;

const GeneratePersonalizedStudyTipOutputSchema = z.object({
    tip: z.string().describe('The personalized study tip.'),
});
export type GeneratePersonalizedStudyTipOutput = z.infer<typeof GeneratePersonalizedStudyTipOutputSchema>;

export async function generatePersonalizedStudyTip(input: GeneratePersonalizedStudyTipInput): Promise<GeneratePersonalizedStudyTipOutput> {
  return generatePersonalizedStudyTipFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedStudyTipPrompt',
  input: {schema: GeneratePersonalizedStudyTipInputSchema},
  output: {schema: GeneratePersonalizedStudyTipOutputSchema},
  prompt: `You are an encouraging and insightful study coach. Your goal is to provide a single, personalized study tip to a student based on their recent performance metrics. Keep the tip concise and motivational.

  Here is the student's performance data:
  - Current Study Streak: {{{streak}}} days
  - Pomodoro Sessions Completed: {{{pomodoroSessions}}}
  - AI Summaries Generated: {{{aiSummaries}}}

  Analyze the data and provide a relevant tip.
  - If the streak is low, encourage them to build a habit.
  - If the pomodoro count is high, praise their focus and suggest a new technique.
  - If they use AI summaries, suggest how to use them more effectively.
  - If a metric is zero, suggest they try that feature.
  - Combine observations for a more personal message.
  
  Example: "Your 5-day streak is amazing! To make your focused study sessions even more powerful, try turning your AI summaries into flashcards for active recall."
  
  Now, generate a new, unique tip based on the provided data.`,
});

const generatePersonalizedStudyTipFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedStudyTipFlow',
    inputSchema: GeneratePersonalizedStudyTipInputSchema,
    outputSchema: GeneratePersonalizedStudyTipOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
