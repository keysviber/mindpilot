import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FilePenLine, Save } from "lucide-react";

export function QuickNotes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FilePenLine className="h-5 w-5 text-primary" />
          <span>Quick Notes</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea placeholder="Jot down your thoughts, ideas, or to-do's..." rows={6} />
        <Button className="mt-4 w-full sm:w-auto">
          <Save className="mr-2" />
          Save Note
        </Button>
      </CardContent>
    </Card>
  );
}
