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
    if (!audio || !activeTrack) {
      return;
    }

    // When the track changes, update the source and play
    audio.src = activeTrack.url;
    audio.load();
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Automatic playback started!
          setIsPlaying(true);
        })
        .catch(error => {
          // Auto-play was prevented
          console.error("Audio play failed:", error);
          setIsPlaying(false);
        });
    }

    const handleEnded = () => {
        setIsPlaying(false);
    }
    audio.addEventListener('ended', handleEnded);

    return () => {
        audio.pause();
        audio.removeEventListener('ended', handleEnded);
    }
  }, [activeTrack]);


  const handlePlayPause = (track: MusicTrack) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    // If it's the same track, toggle play/pause
    if (activeTrack?.url === track.url) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().catch(e => console.error("Failed to play", e));
        setIsPlaying(true);
      }
    } else {
      // It's a new track, set it. The useEffect will handle playback.
      setActiveTrack(track);
    }
  };
  
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
        <audio 
          ref={audioRef}
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
