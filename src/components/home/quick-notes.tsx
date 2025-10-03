'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FilePenLine, Save, Loader2 } from "lucide-react";
import { useUser, useFirestore, useMemoFirebase, useCollection } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";

export function QuickNotes() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [newNote, setNewNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const notesCollection = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, `users/${user.uid}/notes`);
  }, [user, firestore]);

  const { data: notes, isLoading } = useCollection(notesCollection);

  const handleSaveNote = async () => {
    if (!newNote.trim() || !notesCollection) return;

    setIsSaving(true);
    const noteData = {
      content: newNote,
      createdAt: serverTimestamp(),
    };

    // We don't await this, UI can update optimistically
    addDocumentNonBlocking(notesCollection, noteData);
    
    setNewNote("");
    setIsSaving(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FilePenLine className="h-5 w-5 text-primary" />
          <span>Quick Notes</span>
        </CardTitle>
        <CardDescription>Jot down your thoughts. They are saved automatically.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="Jot down your thoughts, ideas, or to-do's..."
            rows={4}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            disabled={isSaving}
          />
          <Button onClick={handleSaveNote} disabled={!newNote.trim() || isSaving} className="w-full sm:w-auto">
            {isSaving ? <Loader2 className="mr-2 animate-spin" /> : <Save className="mr-2" />}
            Save Note
          </Button>

          <div className="space-y-3 pt-4">
            <h3 className="text-sm font-medium text-muted-foreground">My Notes</h3>
            {isLoading && <p>Loading notes...</p>}
            {!isLoading && notes && notes.length === 0 && (
              <p className="text-sm text-muted-foreground">You haven't saved any notes yet.</p>
            )}
            <div className="space-y-2">
              {notes?.map((note) => (
                <div key={note.id} className="p-3 bg-secondary rounded-md text-sm">
                  {note.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
