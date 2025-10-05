'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateStudyPlan, type GenerateStudyPlanOutput } from '@/ai/flows/generate-study-plan';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Route } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { useUser } from '@/firebase';

type SavedPlan = {
  id: number;
  inputs: z.infer<typeof formSchema>;
  plan: GenerateStudyPlanOutput['plan'];
};

const formSchema = z.object({
  topics: z.string().min(10, 'Please describe your topics in more detail.'),
  duration: z.coerce.number().min(1).max(90),
  learningStyle: z.string({ required_error: 'Please select a learning style.' }),
});

export function StudyPlanGenerator() {
  const [result, setResult] = useState<GenerateStudyPlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const [arePlansLoading, setArePlansLoading] = useState(true);

  const getLocalStorageKey = () => {
    // We can keep study plans local as they are less likely to be needed across devices.
    return user ? `study-plans_${user.uid}` : 'study-plans_guest';
  };

  useEffect(() => {
    setArePlansLoading(true);
    try {
      const key = getLocalStorageKey();
      const storedPlans = localStorage.getItem(key);
      if (storedPlans) {
        setSavedPlans(JSON.parse(storedPlans));
      }
    } catch (error) {
      console.error("Failed to load study plans from localStorage", error);
    }
    setArePlansLoading(false);
  }, [user]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topics: '',
      duration: 7,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    try {
      const planResult = await generateStudyPlan(values);
      if (planResult.plan && planResult.plan.length > 0) {
        setResult(planResult);

        const newPlan: SavedPlan = {
          id: Date.now(),
          inputs: values,
          plan: planResult.plan,
        };

        const updatedPlans = [newPlan, ...savedPlans];
        setSavedPlans(updatedPlans);
        localStorage.setItem(getLocalStorageKey(), JSON.stringify(updatedPlans));
        
        toast({
            title: 'Study Plan Saved Locally!',
            description: 'Your new plan has been saved to this device.',
        });

      } else {
        toast({
          title: 'No Plan Generated',
          description: 'The AI could not generate a study plan. Please try different inputs.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error generating study plan:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate study plan. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Study Plan Generator</CardTitle>
            <CardDescription>
              Tell the AI what you need to study, and it will create a custom schedule for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="topics"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topics / Subjects</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Biology: Cell division, Photosynthesis. History: The Renaissance." {...field} rows={5} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Study Duration (days)</FormLabel>
                          <FormControl>
                          <Input type="number" placeholder="e.g., 14" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="learningStyle"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Learning Style</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                  <SelectTrigger>
                                      <SelectValue placeholder="Select your style" />
                                  </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                      <SelectItem value="visual">Visual (diagrams, charts)</SelectItem>
                                      <SelectItem value="auditory">Auditory (lectures, discussions)</SelectItem>
                                      <SelectItem value="kinesthetic">Kinesthetic (hands-on, practice)</SelectItem>
                                      <SelectItem value="reading-writing">Reading/Writing (notes, articles)</SelectItem>
                                  </SelectContent>
                              </Select>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <Route className="mr-2" />}
                  Generate & Save Study Plan
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Saved Study Plans</CardTitle>
                <CardDescription>Your locally saved study plans.</CardDescription>
            </CardHeader>
            <CardContent>
                {arePlansLoading && <p>Loading plans...</p>}
                {!arePlansLoading && savedPlans.length === 0 && <p className="text-sm text-muted-foreground text-center">No study plans saved yet.</p>}
                 <Accordion type="single" collapsible className="w-full">
                    {savedPlans.map(savedPlan => (
                        <AccordionItem value={`plan-${savedPlan.id}`} key={savedPlan.id}>
                             <AccordionTrigger>{savedPlan.inputs.topics.substring(0, 50)}... ({savedPlan.inputs.duration} days)</AccordionTrigger>
                             <AccordionContent>
                                {savedPlan.plan.map((item) => (
                                    <div key={item.day} className="py-2 border-b">
                                        <p className="font-semibold">Day {item.day}: {item.topic}</p>
                                        <p className="text-sm text-primary">{item.activity}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{item.details}</p>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
      </div>

      <div className="lg:sticky top-8">
        <Card>
            <CardHeader>
                <CardTitle>Your Personalized Study Plan</CardTitle>
                <CardDescription>
                Follow this schedule to stay on track. It will be saved locally.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading && (
                <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
                )}
                {!isLoading && result && result.plan.length > 0 && (
                <Accordion type="single" collapsible className="w-full">
                    {result.plan.map((item) => (
                        <AccordionItem value={`day-${item.day}`} key={item.day}>
                            <AccordionTrigger>
                                <div className='flex items-center gap-4'>
                                    <div className="bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold">{item.day}</div>
                                    <span className='font-semibold'>{item.topic}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-12">
                                <p className="font-medium text-primary">{item.activity}</p>
                                <p className="text-sm text-muted-foreground mt-1">{item.details}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                )}
                {!isLoading && !result && (
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg text-center p-4">
                    <Route className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-sm text-muted-foreground">Your study plan will appear here</p>
                </div>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
