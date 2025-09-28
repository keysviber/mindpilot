import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UpcomingDeadlines() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-primary" />
          <span>Upcoming Deadlines</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Connect your calendar to see upcoming exams and assignment deadlines here.
        </p>
        <Button variant="outline" className="w-full">Connect Calendar</Button>
      </CardContent>
    </Card>
  );
}
