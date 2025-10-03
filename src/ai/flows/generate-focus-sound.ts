'use server';
/**
 * @fileOverview Converts a text description into an ambient soundscape using AI.
 *
 * - generateFocusSound - A function that handles the text-to-audio generation.
 * - GenerateFocusSoundInput - The input type for the generateFocusSound function.
 * - GenerateFocusSoundOutput - The return type for the generateFocusSound function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';
import { googleAI } from '@genkit-ai/google-genai';

const GenerateFocusSoundInputSchema = z.object({
  description: z.string().describe('A description of the desired soundscape, e.g., "Gentle rain and distant thunder".'),
});
export type GenerateFocusSoundInput = z.infer<typeof GenerateFocusSoundInputSchema>;

const GenerateFocusSoundOutputSchema = z.object({
    media: z.string().describe("A data URI of the generated audio file. Expected format: 'data:audio/wav;base64,<encoded_data>'."),
});
export type GenerateFocusSoundOutput = z.infer<typeof GenerateFocusSoundOutputSchema>;

export async function generateFocusSound(
  input: GenerateFocusSoundInput
): Promise<GenerateFocusSoundOutput> {
  return generateFocusSoundFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const generateFocusSoundFlow = ai.defineFlow(
  {
    name: 'generateFocusSoundFlow',
    inputSchema: GenerateFocusSoundInputSchema,
    outputSchema: GenerateFocusSoundOutputSchema,
  },
  async input => {
    const { media } = await ai.generate({
        model: googleAI.model('gemini-2.5-flash-preview-tts'),
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Algenib' },
            },
          },
        },
        prompt: `This is a request to generate an ambient soundscape, not to speak the text. Create a sound effect that matches the following description: ${input.description}`,
      });

      if (!media) {
        throw new Error('No media was returned from the model.');
      }

      const audioBuffer = Buffer.from(
        media.url.substring(media.url.indexOf(',') + 1),
        'base64'
      );
      
      const wavData = await toWav(audioBuffer);
      
      return {
        media: 'data:audio/wav;base64,' + wavData,
      };
  }
);
