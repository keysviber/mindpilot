'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { studyTips } from "@/lib/data";
import { Lightbulb } from "lucide-react";

export function StudyTips() {
  const [tip, setTip] = useState('');

  useEffect(() => {
    setTip(studyTips[Math.floor(Math.random() * studyTips.length)]);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <span>Daily Study Tip</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{tip || "Loading your daily tip..."}</p>
      </CardContent>
    </Card>
  );
}
