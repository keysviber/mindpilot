import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WeeklyReport() {
  return (
    <Card className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-primary" />
          <span>Weekly Report</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          A summary of your study habits and focus sessions from the past week will appear here.
        </p>
        <Button variant="outline" className="w-full">View Full Report</Button>
      </CardContent>
    </Card>
  );
}
