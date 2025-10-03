import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { achievements } from "@/lib/data";
import { TrendingUp } from "lucide-react";

export function ProgressTracker() {
  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span>My Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {achievements.map((achievement, index) => {
          const percentage = (achievement.current / achievement.total) * 100;
          return (
            <div 
              key={achievement.title} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <achievement.icon className="h-5 w-5 text-muted-foreground" />
                  <p className="font-medium">{achievement.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {achievement.current}/{achievement.total}
                </p>
              </div>
              <Progress value={percentage} aria-label={`${achievement.title} progress`} />
              <p className="text-xs text-muted-foreground mt-1.5">{achievement.description}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
