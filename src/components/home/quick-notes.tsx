'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FilePenLine, Save, Loader2, Trash2 } from "lucide-react";
import { useUser, useFirestore, useMemoFirebase } from "@/firebase";
import { useCollection } from "@/firebase/firestore/use-collection";
import { addDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { collection, doc } from "firebase/firestore";

type Note = {
  id: string;
  content: string;
  createdAt: string;
  userId?: string;
};

export function QuickNotes() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [newNote, setNewNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const notesCollectionRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'users', user.uid, 'notes');
  }, [firestore, user]);

  const { data: notes, isLoading: areNotesLoading } = useCollection<Note>(notesCollectionRef);

  const handleSaveNote = () => {
    if (!newNote.trim() || !firestore || !user) return;

    setIsSaving(true);
    const noteToSave = {
      content: newNote,
      createdAt: new Date().toISOString(),
      userId: user.uid,
    };
    
    addDocumentNonBlocking(collection(firestore, 'users', user.uid, 'notes'), noteToSave);
    
    setNewNote("");
    setIsSaving(false);
  };
  
  const handleDeleteNote = (noteId: string) => {
    if (!firestore || !user) return;
    deleteDocumentNonBlocking(doc(firestore, 'users', user.uid, 'notes', noteId));
  };


  return (
    <Card className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FilePenLine className="h-5 w-5 text-primary" />
          <span>Quick Notes</span>
        </CardTitle>
        <CardDescription>Jot down your thoughts. They're saved to your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="Jot down your thoughts, ideas, or to-do's..."
            rows={4}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            disabled={isSaving || isUserLoading || !user}
          />
          <Button onClick={handleSaveNote} disabled={!newNote.trim() || isSaving || isUserLoading || !user} className="w-full sm:w-auto">
            {isSaving ? <Loader2 className="mr-2 animate-spin" /> : <Save className="mr-2" />}
            Save Note
          </Button>

          <div className="space-y-3 pt-4">
            <h3 className="text-sm font-medium text-muted-foreground">My Notes</h3>
            {areNotesLoading && <p>Loading notes...</p>}
            {!areNotesLoading && (!notes || notes.length === 0) && (
              <p className="text-sm text-muted-foreground">You haven't saved any notes yet.</p>
            )}
             {!user && !isUserLoading && (
                <p className="text-sm text-center text-muted-foreground bg-muted p-4 rounded-md">
                    Sign in to save notes to your account and access them from any device.
                </p>
            )}
            <div className="space-y-2">
              {notes?.map((note, index) => (
                <div 
                  key={note.id} 
                  className="flex justify-between items-start p-3 bg-secondary rounded-md text-sm animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <p className="break-all">{note.content}</p>
                   <Button variant="ghost" size="icon" className="shrink-0" onClick={() => handleDeleteNote(note.id)}>
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                   </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
