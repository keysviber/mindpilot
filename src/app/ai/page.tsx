import { AppShell } from '@/components/shared/app-shell';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NoteGenerator } from '@/components/ai/note-generator';
import { FlashcardGenerator } from '@/components/ai/flashcard-generator';
import { Book, Layers, Music, Route } from 'lucide-react';

export default function AiPage() {
  return (
    <AppShell>
      <Tabs defaultValue="summarizer" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="summarizer">
            <Book className="mr-2 h-4 w-4" />
            Summarizer
          </TabsTrigger>
          <TabsTrigger value="flashcards">
            <Layers className="mr-2 h-4 w-4" />
            Flashcards
          </TabsTrigger>
          <TabsTrigger value="study-plan" disabled>
            <Route className="mr-2 h-4 w-4" />
            Study Plan
          </TabsTrigger>
          <TabsTrigger value="audio-notes" disabled>
            <Music className="mr-2 h-4 w-4" />
            Audio Notes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="summarizer" className="mt-6">
          <NoteGenerator />
        </TabsContent>
        <TabsContent value="flashcards" className="mt-6">
          <FlashcardGenerator />
        </TabsContent>
        <TabsContent value="study-plan" className="mt-6">
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <Route className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">AI Study Plans Coming Soon</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Personalized study schedules based on your syllabus and exam dates.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="audio-notes" className="mt-6">
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <Music className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Note-to-Audiobook Coming Soon</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Convert your study notes into audio for learning on the go.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
