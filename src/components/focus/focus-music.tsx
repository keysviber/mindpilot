'use client';

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { musicTracks, type MusicTrack } from "@/lib/data";
import { Music, Play, Pause, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function FocusMusic() {
  const [activeTrack, setActiveTrack] = useState<MusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(error => {
        console.error("Audio play failed:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = (track: MusicTrack) => {
    if (activeTrack?.url === track.url) {
      // Toggle play/pause for the current track
      setIsPlaying(!isPlaying);
    } else {
      // Switch to a new track
      setActiveTrack(track);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = track.url;
        audioRef.current.load(); // Important: load the new source
      }
    }
  };
  
  const onEnded = () => {
    setIsPlaying(false);
    // Optional: play next track in the playlist
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5 text-primary" />
          <span>Focus Music</span>
        </CardTitle>
        <CardDescription>Background soundscapes for concentration.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* The audio element is now always rendered but hidden */}
        <audio 
          ref={audioRef} 
          onEnded={onEnded}
          className="hidden"
         />
        <ul className="space-y-3">
          {musicTracks.map((track) => {
            const isActive = activeTrack?.url === track.url;
            return (
              <li 
                key={track.title} 
                className={cn(
                    "flex items-center justify-between p-2 rounded-md hover:bg-secondary cursor-pointer",
                    isActive && 'bg-secondary'
                )}
                onClick={() => handlePlayPause(track)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-md">
                    {isActive && isPlaying ? (
                       <Volume2 className="h-5 w-5 text-primary animate-pulse" />
                    ) : (
                       <span className="text-lg">{track.icon}</span>
                    )}
                  </div>
                  
                  <div>
                    <p className="font-medium">{track.title}</p>
                    <p className="text-xs text-muted-foreground">{track.description}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0">
                    {isActive && isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
