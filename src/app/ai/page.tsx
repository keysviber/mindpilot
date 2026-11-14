import { AppShell } from "@/components/shared/app-shell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NoteGenerator } from "@/components/ai/note-generator";
import { FlashcardGenerator } from "@/components/ai/flashcard-generator";
import { AudioGenerator } from "@/components/ai/audio-generator";
import { StudyPlanGenerator } from "@/components/ai/study-plan-generator";
import { Book, Layers, Music, Route } from "lucide-react";
import { AuthGuard } from "@/components/shared/auth-guard";

export default async function AiPage({
  searchParams,
}: {
  searchParams: Promise<{ tool?: string }>;
}) {
  const { tool } = await searchParams;
  const selectedTool = [
    "summarizer",
    "flashcards",
    "audio-notes",
    "study-plan",
  ].includes(tool || "")
    ? tool
    : "summarizer";
  return (
    <AuthGuard>
      <AppShell>
        <div className="page-intro">
          <div className="eyebrow">
            <span className="status-dot" />
            YOUR IDEAS, SUPERCHARGED
          </div>
          <h1>Welcome to your study studio.</h1>
          <p>
            Turn a pile of notes into a little more clarity. Summarize, make
            flashcards, listen, or plan your next step.
          </p>
        </div>
        <Tabs defaultValue={selectedTool} className="w-full animate-fade-in-up">
          <TabsList className="grid w-full grid-cols-2 gap-2 h-auto p-2 sm:grid-cols-4">
            <TabsTrigger value="summarizer">
              <Book className="mr-1 h-4 w-4" />
              Summarizer
            </TabsTrigger>
            <TabsTrigger value="flashcards">
              <Layers className="mr-1 h-4 w-4" />
              Flashcards
            </TabsTrigger>
            <TabsTrigger value="audio-notes">
              <Music className="mr-1 h-4 w-4" />
              Audio Notes
            </TabsTrigger>
            <TabsTrigger value="study-plan">
              <Route className="mr-1 h-4 w-4" />
              Study Plan
            </TabsTrigger>
          </TabsList>
          <TabsContent value="summarizer" className="mt-6">
            <NoteGenerator />
          </TabsContent>
          <TabsContent value="flashcards" className="mt-6">
            <FlashcardGenerator />
          </TabsContent>
          <TabsContent value="audio-notes" className="mt-6">
            <AudioGenerator />
          </TabsContent>
          <TabsContent value="study-plan" className="mt-6">
            <StudyPlanGenerator />
          </TabsContent>
        </Tabs>
      </AppShell>
    </AuthGuard>
  );
}
