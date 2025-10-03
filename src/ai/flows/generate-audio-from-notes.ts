'use server';
/**
 * @fileOverview Converts text notes to an audio file using TTS.
 *
 * - generateAudioFromNotes - A function that handles the text-to-speech conversion.
 * - GenerateAudioFromNotesInput - The input type for the generateAudioFromNotes function.
 * - GenerateAudioFromNotesOutput - The return type for the generateAudioFromNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';
import { googleAI } from '@genkit-ai/google-genai';

const GenerateAudioFromNotesInputSchema = z.object({
  notes: z.string().describe('The notes to convert to audio.'),
});
export type GenerateAudioFromNotesInput = z.infer<typeof GenerateAudioFromNotesInputSchema>;

const GenerateAudioFromNotesOutputSchema = z.object({
    media: z.string().describe("A data URI of the generated audio file. Expected format: 'data:audio/wav;base64,<encoded_data>'."),
});
export type GenerateAudioFromNotesOutput = z.infer<typeof GenerateAudioFromNotesOutputSchema>;

export async function generateAudioFromNotes(
  input: GenerateAudioFromNotesInput
): Promise<GenerateAudioFromNotesOutput> {
  return generateAudioFromNotesFlow(input);
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

const generateAudioFromNotesFlow = ai.defineFlow(
  {
    name: 'generateAudioFromNotesFlow',
    inputSchema: GenerateAudioFromNotesInputSchema,
    outputSchema: GenerateAudioFromNotesOutputSchema,
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
        prompt: input.notes,
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
