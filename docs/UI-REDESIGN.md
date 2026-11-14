# MindPilot interface refresh

The interface uses the palette inspected on https://www.mindpilotinfra.com/: primary `hsl(142 69% 58%)` / mint `#4ADE80`, background `hsl(0 0% 98%)`, foreground `hsl(0 0% 15%)`, and white cards. Deep green and muted pastel accents support the learning experience.

- `/`: public interactive learning space, with Biology, Mathematics, and History practice units. Each lesson explains a concept before checking understanding. New completions earn 20 XP and unlock the next step. Repeating a lesson does not award duplicate XP.
- `/dashboard`: existing authenticated/guest personal workspace with refreshed navigation, cards, and page hierarchy.
- `/ai`: existing study tools, with direct links using `?tool=summarizer`, `?tool=flashcards`, `?tool=audio-notes`, or `?tool=study-plan`.
- `/focus` and `/community`: existing features within the new responsive shell.
- `/login` and `/signup`: refreshed authentication layout, retaining Firebase authentication and the explicit guest option.

Practice progress is stored only in this browser under `mindpilot-learning-v1`. It is separate from account-backed study progress. The daily mission reflects a completed practice lesson on the current local date; the activity statistic represents today, not a historical streak. Practice units are starter content, not an AI-generated or comprehensive curriculum.

Pip is a code-native SVG mascot. CSS provides floating, blinking, waveform, button, entry, and reward animations. `prefers-reduced-motion` disables animation and transitions. Desktop uses a sidebar; phones use bottom navigation. Lesson dialogs retain keyboard dismissal and focus management through Radix.

## Preview

Install dependencies with `npm.cmd install --legacy-peer-deps`, then run `npm.cmd run dev`. Open http://localhost:3000. Use `npm.cmd run typecheck` for TypeScript validation.

The interface refresh does not configure live AI credentials, deploy a frontend, or verify Firebase provider settings.
