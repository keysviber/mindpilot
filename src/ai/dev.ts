import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-uploaded-documents.ts';
import '@/ai/flows/generate-flashcards-from-study-materials.ts';
import '@/ai/flows/generate-audio-from-notes.ts';
import '@/ai/flows/generate-study-plan.ts';
import '@/ai/flows/generate-focus-sound.ts';
