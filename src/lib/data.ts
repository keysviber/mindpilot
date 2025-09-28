import { Flame, Trophy, Zap, Lightbulb, BookOpen, Clock } from 'lucide-react';

export const studyTips = [
  "Use the Feynman technique: explain a concept in simple terms to identify gaps in your knowledge.",
  "Space out your study sessions. Distributed practice is more effective than cramming.",
  "Test yourself frequently. Active recall strengthens memory pathways.",
  "Get enough sleep. Your brain consolidates memories while you rest.",
  "Stay hydrated and eat nutritious food to keep your brain at peak performance.",
  "Take regular breaks to avoid burnout. The Pomodoro Technique is great for this.",
  "Switch between different subjects to keep your mind engaged and improve retention."
];

export const achievements = [
  { icon: Flame, title: "5-Day Streak", description: "Studied for 5 days in a row.", current: 5, total: 5 },
  { icon: Trophy, title: "Pomodoro Master", description: "Completed 50 focus sessions.", current: 27, total: 50 },
  { icon: Zap, title: "Quick Learner", description: "Generated 10 AI summaries.", current: 4, total: 10 },
];

export const musicTracks = [
  { title: "Lofi Beats", description: "Chill, instrumental hip-hop to help you focus.", icon: "🎧" },
  { title: "Rainy Day", description: "Soothing sounds of rain for a calm study environment.", icon: "🌧️" },
  { title: "Binaural Waves", description: "Alpha waves (8-13Hz) to promote a state of relaxed alertness.", icon: "🌊" },
  { title: "Classical Focus", description: "Orchestral masterpieces to inspire deep work.", icon: "🎻" },
];

export const communityChallenges = [
    {
        title: "Weekend Warrior",
        description: "Complete 5 hours of focused study over the weekend.",
        icon: BookOpen,
        progress: 60,
    },
    {
        title: "30-Day Focus Challenge",
        description: "Study for at least 30 minutes every day for 30 days.",
        icon: Clock,
        progress: 45,
    },
];
