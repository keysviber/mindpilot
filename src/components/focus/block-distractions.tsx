import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function BlockDistractions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span>Focus Mode</span>
        </CardTitle>
        <CardDescription>Block distractions during study sessions.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
                <Label htmlFor="focus-mode-switch">Enable Focus Mode</Label>
                <p className="text-xs text-muted-foreground">
                    Block distracting websites and apps.
                </p>
            </div>
            <Switch id="focus-mode-switch" />
        </div>
         <Button variant="outline" className="w-full mt-4">
            Customize Blocklist
        </Button>
      </CardContent>
    </Card>
  );
}
