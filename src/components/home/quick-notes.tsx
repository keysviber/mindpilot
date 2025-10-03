'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FilePenLine, Save, Loader2 } from "lucide-react";
import { useUser } from "@/firebase";

// Define a type for our note for better type-safety
type Note = {
  id: number;
  content: string;
  createdAt: string;
};

export function QuickNotes() {
  const { user } = useUser(); // We still use this to associate notes with a user locally
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const getLocalStorageKey = () => {
    // Create a unique key for each user, or a generic one for guests
    return user ? `quick-notes_${user.uid}` : 'quick-notes_guest';
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      const key = getLocalStorageKey();
      const savedNotes = localStorage.getItem(key);
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.error("Failed to load notes from localStorage", error);
      setNotes([]);
    }
    setIsLoading(false);
  }, [user]); // Rerun when the user logs in or out

  const handleSaveNote = () => {
    if (!newNote.trim()) return;

    setIsSaving(true);
    const noteToSave: Note = {
      id: Date.now(),
      content: newNote,
      createdAt: new Date().toISOString(),
    };

    const updatedNotes = [noteToSave, ...notes];
    setNotes(updatedNotes);

    try {
      const key = getLocalStorageKey();
      localStorage.setItem(key, JSON.stringify(updatedNotes));
    } catch (error) {
      console.error("Failed to save note to localStorage", error);
      // Optionally, show a toast to the user
    }
    
    setNewNote("");
    setIsSaving(false);
  };

  return (
    <Card className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FilePenLine className="h-5 w-5 text-primary" />
          <span>Quick Notes</span>
        </CardTitle>
        <CardDescription>Jot down your thoughts. They are saved locally to your device.</CardDescription>
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
            {!isLoading && notes.length === 0 && (
              <p className="text-sm text-muted-foreground">You haven't saved any notes yet.</p>
            )}
            <div className="space-y-2">
              {notes.map((note, index) => (
                <div 
                  key={note.id} 
                  className="p-3 bg-secondary rounded-md text-sm animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
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
