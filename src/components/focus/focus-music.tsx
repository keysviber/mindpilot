import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { musicTracks } from "@/lib/data";
import { Music, Play } from "lucide-react";

export function FocusMusic() {
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
        <ul className="space-y-3">
          {musicTracks.map((track) => (
            <li key={track.title} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary">
              <div className="flex items-center gap-3">
                <span className="text-xl">{track.icon}</span>
                <div>
                  <p className="font-medium">{track.title}</p>
                  <p className="text-xs text-muted-foreground">{track.description}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Play className="h-5 w-5" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
