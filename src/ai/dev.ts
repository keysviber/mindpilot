import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-uploaded-documents.ts';
import '@/ai/flows/generate-flashcards-from-study-materials.ts';