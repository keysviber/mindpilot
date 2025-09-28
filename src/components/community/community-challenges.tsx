import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { communityChallenges } from "@/lib/data";
import { Trophy } from "lucide-react";

export function CommunityChallenges() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <span>Community Challenges</span>
        </CardTitle>
        <CardDescription>Gamified accountability with peers.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {communityChallenges.map((challenge) => (
          <div key={challenge.title}>
            <div className="flex items-start gap-3">
                <challenge.icon className="h-5 w-5 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div>
                    <p className="font-medium">{challenge.title}</p>
                    <p className="text-xs text-muted-foreground mb-2">{challenge.description}</p>
                    <Progress value={challenge.progress} className="h-2" />
                </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
