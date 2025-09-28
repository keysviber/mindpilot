import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export function StudyGroups() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <span>Study Groups</span>
        </CardTitle>
        <CardDescription>Collaborate, share notes, and discuss topics.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center">
        <div className="flex -space-x-2 overflow-hidden mb-4">
            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-background" src="https://picsum.photos/seed/p1/100/100" alt="User 1"/>
            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-background" src="https://picsum.photos/seed/p2/100/100" alt="User 2"/>
            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-background" src="https://picsum.photos/seed/p3/100/100" alt="User 3"/>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Join a study group or create your own to boost your learning.
        </p>
        <Button className="w-full">Find a Group</Button>
      </CardContent>
    </Card>
  );
}
