"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Atom,
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  Flag,
  Flame,
  FlaskConical,
  GraduationCap,
  Headphones,
  Layers,
  LockKeyhole,
  Play,
  Sparkles,
  Star,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PilotMascot } from "@/components/shared/pilot-mascot";
const subjects = [
  {
    name: "Biology",
    icon: FlaskConical,
    topic: "The building blocks of life",
    unit: "Cells & living things",
    lessons: ["Meet the cell", "Inside the cell", "The big picture"],
    questions: [
      {
        q: "What is the basic unit of life?",
        a: ["A cell", "An organ", "An atom"],
        correct: 0,
        why: "Cells are the smallest units that can carry out the processes of life.",
      },
      {
        q: "Which part of the cell contains genetic material?",
        a: ["Cell membrane", "Nucleus", "Cytoplasm"],
        correct: 1,
        why: "The nucleus stores DNA, the instructions that guide the cell.",
      },
      {
        q: "What controls what enters and leaves a cell?",
        a: ["Nucleus", "Mitochondrion", "Cell membrane"],
        correct: 2,
        why: "The cell membrane acts as a selective barrier around the cell.",
      },
    ],
  },
  {
    name: "Mathematics",
    icon: Atom,
    topic: "Make numbers make sense",
    unit: "Algebra essentials",
    lessons: ["Meet the variable", "Find the balance", "Solve it yourself"],
    questions: [
      {
        q: "If x + 3 = 7, what is x?",
        a: ["3", "4", "10"],
        correct: 1,
        why: "Subtract 3 from both sides: x = 7 - 3 = 4.",
      },
      {
        q: "What is 3 × (2 + 4)?",
        a: ["10", "14", "18"],
        correct: 2,
        why: "Work inside the brackets first: 2 + 4 = 6, then 3 × 6 = 18.",
      },
      {
        q: "Which expression is equal to 2x + 3x?",
        a: ["5x", "6x", "5x²"],
        correct: 0,
        why: "Like terms combine: two lots of x plus three lots of x equals five lots of x.",
      },
    ],
  },
  {
    name: "History",
    icon: BookOpen,
    topic: "Every story has a beginning",
    unit: "Thinking like a historian",
    lessons: [
      "Follow the evidence",
      "Ask better questions",
      "Connect the dots",
    ],
    questions: [
      {
        q: "Which is a primary source?",
        a: [
          "A modern textbook",
          "A diary from the time",
          "A recent documentary",
        ],
        correct: 1,
        why: "A diary written during an event is firsthand evidence from that period.",
      },
      {
        q: "What does chronology mean?",
        a: ["Events in time order", "The study of maps", "A personal opinion"],
        correct: 0,
        why: "Chronology arranges events in the order in which they happened.",
      },
      {
        q: "Why compare different sources?",
        a: [
          "To find the longest one",
          "To avoid reading",
          "To check evidence and perspectives",
        ],
        correct: 2,
        why: "Comparing sources helps identify bias, corroborate facts, and understand different views.",
      },
    ],
  },
];
type Progress = { xp: number; completed: string[]; date: string };
export function LearningHub() {
  const [subject, setSubject] = useState(0);
  const [progress, setProgress] = useState<Progress>({
    xp: 0,
    completed: [],
    date: "",
  });
  const [loaded, setLoaded] = useState(false);
  const [lesson, setLesson] = useState<number | null>(null);
  const [step, setStep] = useState(-1);
  const [answer, setAnswer] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);
  const [earned, setEarned] = useState(false);
  const current = subjects[subject];
  const today = new Date().toLocaleDateString("en-CA");
  useEffect(() => {
    try {
      const s = JSON.parse(
        localStorage.getItem("mindpilot-learning-v1") || "null",
      );
      if (
        s &&
        Number.isFinite(s.xp) &&
        s.xp >= 0 &&
        Array.isArray(s.completed) &&
        s.completed.every((v: unknown) => typeof v === "string")
      )
        setProgress(s);
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded)
      try {
        localStorage.setItem("mindpilot-learning-v1", JSON.stringify(progress));
      } catch {}
  }, [progress, loaded]);
  const completed = current.lessons.filter((_, i) =>
    progress.completed.includes(`${subject}-${i}`),
  ).length;
  const daily = progress.date === today;
  const start = (i: number) => {
    setLesson(i);
    setStep(-1);
    setAnswer(null);
    setChecked(false);
    setFinished(false);
    setEarned(false);
  };
  const finish = () => {
    const key = `${subject}-${lesson}`;
    const fresh = !progress.completed.includes(key);
    setEarned(fresh);
    setProgress((p) => ({
      ...p,
      xp: p.xp + (fresh ? 20 : 0),
      completed: fresh ? [...p.completed, key] : p.completed,
      date: today,
    }));
    setFinished(true);
  };
  return (
    <>
      <div className="learning-heading">
        <div>
          <div className="eyebrow">
            <span className="status-dot" /> LET'S MAKE A LITTLE PROGRESS
          </div>
          <h1>
            A little wiser, every day<span className="green-text">.</span>
          </h1>
          <p>Your next big idea starts with one small step.</p>
        </div>
        <span className="heading-sticker">
          <Sparkles size={15} /> A fresh start awaits
        </span>
      </div>
      <div className="learning-layout">
        <div className="learning-center">
          <section className="welcome-banner">
            <div className="welcome-copy">
              <span className="pill-light">
                <Zap size={13} fill="currentColor" /> SMALL SESSIONS. BIG WINS.
              </span>
              <h2>
                Less pressure.
                <br />
                More <span className="serif-word">“I get it.”</span>
              </h2>
              <p>
                Build your confidence, one bite-sized
                <br className="desktop-break" /> lesson at a time. Pip's got
                your back.
              </p>
              <button
                className="pilot-button dark-button"
                onClick={() => start(Math.min(completed, 2))}
              >
                {completed ? "Keep learning" : "Let’s get learning"}
                <ArrowRight size={17} />
              </button>
            </div>
            <div className="banner-art">
              <span className="art-orbit orbit-one" />
              <span className="art-orbit orbit-two" />
              <span className="floating-star">
                <Star size={20} fill="currentColor" />
              </span>
              <span className="mascot-bubble">You've got this!</span>
              <PilotMascot />
              <span className="art-spark">✦</span>
            </div>
          </section>
          <section className="your-path">
            <div className="section-title">
              <div>
                <h2>
                  Your learning path{" "}
                  <span className="tiny-label">PRACTICE</span>
                </h2>
                <p>Pick a subject. Find your flow.</p>
              </div>
              <span className="small-muted">3 subjects to explore</span>
            </div>
            <div
              className="subject-tabs"
              role="group"
              aria-label="Choose a subject"
            >
              {subjects.map((s, i) => (
                <button
                  key={s.name}
                  aria-pressed={i === subject}
                  className={subject === i ? "active" : ""}
                  onClick={() => setSubject(i)}
                >
                  <s.icon size={17} />
                  {s.name}
                </button>
              ))}
            </div>
            <div className="path-card">
              <div className="unit-heading">
                <span className="unit-icon">
                  <current.icon size={23} />
                </span>
                <div>
                  <span className="eyebrow">
                    UNIT 01 · {current.name.toUpperCase()}
                  </span>
                  <h3>{current.topic}</h3>
                </div>
                <span className="unit-count">{completed}/3</span>
              </div>
              <div className="unit-progress">
                <span style={{ width: `${(completed / 3) * 100}%` }} />
              </div>
              <div className="lesson-list">
                {current.lessons.map((title, i) => {
                  const done = progress.completed.includes(`${subject}-${i}`);
                  const locked = i > completed;
                  return (
                    <button
                      key={`${subject}-${i}`}
                      className={`lesson-row ${done ? "done" : !locked ? "next" : "locked"}`}
                      disabled={locked}
                      onClick={() => start(i)}
                    >
                      <span className="lesson-node">
                        {done ? (
                          <Check size={23} />
                        ) : locked ? (
                          <LockKeyhole size={19} />
                        ) : (
                          <Play size={22} fill="currentColor" />
                        )}
                      </span>
                      <span className="lesson-text">
                        <strong>{title}</strong>
                        <span>
                          {done
                            ? "Nicely done! Revisit your learning."
                            : locked
                              ? "A new discovery is waiting"
                              : `Your next little win · ${current.unit}`}
                        </span>
                      </span>
                      <span className="lesson-time">
                        {!locked && (
                          <>
                            <Clock3 size={13} /> 1 min
                          </>
                        )}
                      </span>
                      <span className="lesson-end">
                        {done ? (
                          <span className="earned-stars">★★★</span>
                        ) : locked ? (
                          <LockKeyhole size={15} />
                        ) : (
                          <ChevronRight size={19} />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="path-footer">
                <Flag size={15} />
                <span>Every step counts. Go at your own pace.</span>
                <span>+20 XP / lesson</span>
              </div>
            </div>
          </section>
          <section className="studio-section">
            <div className="section-title">
              <div>
                <h2>A little help from AI</h2>
                <p>Your notes. A whole new way to learn.</p>
              </div>
              <Link href="/ai" className="text-link">
                Open studio <ArrowRight size={15} />
              </Link>
            </div>
            <div className="studio-cards">
              {[
                {
                  name: "Smart summaries",
                  text: "Big ideas, without the overwhelm.",
                  icon: Sparkles,
                  tone: "mint",
                },
                {
                  name: "Flashcards",
                  text: "Make it stick, one flip at a time.",
                  icon: Layers,
                  tone: "peach",
                },
                {
                  name: "Audio notes",
                  text: "Give your eyes a little break.",
                  icon: Headphones,
                  tone: "lavender",
                },
              ].map((t) => (
                <Link
                  href={`/ai?tool=${t.name === "Flashcards" ? "flashcards" : t.name === "Audio notes" ? "audio-notes" : "summarizer"}`}
                  key={t.name}
                  className="studio-card"
                >
                  <span className={`tool-icon ${t.tone}`}>
                    <t.icon size={20} />
                  </span>
                  <h3>{t.name}</h3>
                  <p>{t.text}</p>
                  <span className="tool-arrow">
                    <ArrowRight size={17} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
          <div className="learning-footnote">
            <span className="status-dot" /> Practice progress is saved on this
            device.
            <Link href="/signup">
              Create your account <ArrowRight size={13} />
            </Link>
          </div>
        </div>
        <aside className="learning-right">
          <div className="mini-stats">
            <div>
              <span className="stat-icon orange">
                <Flame size={22} />
              </span>
              <div>
                <strong>{daily ? "1" : "0"}</strong>
                <span>day active</span>
              </div>
            </div>
            <div>
              <span className="stat-icon green-text">
                <Zap size={21} fill="currentColor" />
              </span>
              <div>
                <strong>{progress.xp}</strong>
                <span>total XP</span>
              </div>
            </div>
          </div>
          <section className="side-card daily-card">
            <div className="side-title">
              <h2>Today's little mission</h2>
              <span className="round-icon mint">
                <Target size={18} />
              </span>
            </div>
            <p>Show up for yourself. That's a win.</p>
            <div className="goal-progress">
              <svg
                viewBox="0 0 100 100"
                aria-label={`${daily ? 1 : 0} of 1 daily lessons completed`}
              >
                <circle cx="50" cy="50" r="42" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="goal-fill"
                  strokeDasharray={`${daily ? 264 : 0} 264`}
                />
              </svg>
              <div>
                <strong>
                  {daily ? "1" : "0"}
                  <span>/1</span>
                </strong>
                <small>lesson today</small>
              </div>
            </div>
            <div className="mission-caption">
              <span>
                {daily
                  ? "Mission accomplished!"
                  : "One lesson. A brighter mind."}
              </span>
              <span className="xp-label">
                <Zap size={13} />
                20 XP
              </span>
            </div>
            <div className="week-days">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => {
                const active = i === (new Date().getDay() + 6) % 7;
                return (
                  <div key={i} className={active ? "today" : ""}>
                    <span>{d}</span>
                    <span>
                      {active && daily ? (
                        <Check size={12} />
                      ) : active ? (
                        "·"
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="focus-invite">
            <span className="round-icon">
              <Headphones size={20} />
            </span>
            <span className="focus-tag">FIND YOUR FLOW</span>
            <h2>
              A calmer mind.
              <br />A clearer focus.
            </h2>
            <p>Put the world on pause for 25 minutes.</p>
            <Link href="/focus" className="pilot-button outline-button">
              Enter focus room <ArrowRight size={16} />
            </Link>
            <span className="focus-wave" aria-hidden="true">
              {[12, 22, 16, 32, 23, 42, 28, 17, 30, 21, 39, 27, 15, 23, 12].map(
                (h, i) => (
                  <i
                    key={i}
                    style={{ height: h, animationDelay: `${i * 0.1}s` }}
                  />
                ),
              )}
            </span>
          </section>
          <section className="side-card milestone-card">
            <div className="side-title">
              <h2>Your next milestone</h2>
              <Trophy size={19} className="gold-text" />
            </div>
            <div className="milestone-body">
              <span className="badge-medal">
                <GraduationCap size={27} />
              </span>
              <div>
                <strong>Curious mind</strong>
                <p>Complete 3 practice lessons</p>
                <div className="milestone-track">
                  <span
                    style={{
                      width: `${Math.min(progress.completed.length / 3, 1) * 100}%`,
                    }}
                  />
                </div>
                <small>
                  {Math.min(progress.completed.length, 3)} of 3 lessons
                </small>
              </div>
            </div>
          </section>
          <div className="pip-tip">
            <span>✦</span>
            <p>
              “You don't have to know it all.
              <br />
              Just a little more than yesterday.”
              <small>— Pip, your learning co-pilot</small>
            </p>
          </div>
        </aside>
      </div>
      <Dialog
        open={lesson !== null}
        onOpenChange={(open) => {
          if (!open) setLesson(null);
        }}
      >
        <DialogContent className="lesson-dialog">
          <DialogTitle>
            {finished
              ? "Look at you grow!"
              : step < 0
                ? current.lessons[lesson ?? 0]
                : "A quick check-in"}
          </DialogTitle>
          <DialogDescription>
            {finished
              ? "Small effort. Real progress."
              : step < 0
                ? "Get comfortable with the ideas before you practice."
                : "Take your time. Mistakes are part of learning."}
          </DialogDescription>
          {finished ? (
            <div className="lesson-success">
              <PilotMascot />
              <div className="reward-burst">
                {earned ? "+20 XP" : "Great practice!"}
              </div>
              <p>
                {earned
                  ? "Your progress is saved. Ready for your next small win?"
                  : "You revisited a completed lesson. Keep those ideas fresh!"}
              </p>
              <button className="pilot-button" onClick={() => setLesson(null)}>
                Back to my path <ArrowRight size={17} />
              </button>
            </div>
          ) : step < 0 ? (
            <div className="lesson-intro">
              <span className="round-icon mint">
                <BookOpen />
              </span>
              <h3>{current.unit}</h3>
              {current.questions
                .filter((_, i) => i === (lesson ?? 0))
                .map((q) => (
                  <p key={q.q}>{q.why}</p>
                ))}
              <button className="pilot-button" onClick={() => setStep(0)}>
                Let's practice <ArrowRight size={17} />
              </button>
            </div>
          ) : (
            <div className="practice-question">
              <div className="unit-progress">
                <span style={{ width: `${checked ? 100 : 35}%` }} />
              </div>
              <h3>{current.questions[lesson ?? 0].q}</h3>
              <div className="answer-options">
                {current.questions[lesson ?? 0].a.map((a, i) => (
                  <button
                    key={a}
                    disabled={checked}
                    className={`${answer === i ? "chosen" : ""} ${checked && i === current.questions[lesson ?? 0].correct ? "correct" : ""}`}
                    onClick={() => setAnswer(i)}
                  >
                    <span>{String.fromCharCode(65 + i)}</span>
                    {a}
                    {checked &&
                      i === current.questions[lesson ?? 0].correct && (
                        <Check size={18} />
                      )}
                  </button>
                ))}
              </div>
              {checked && (
                <div role="status" className="answer-feedback">
                  <strong>
                    {answer === current.questions[lesson ?? 0].correct
                      ? "You got it!"
                      : "A good moment to learn."}
                  </strong>
                  <p>{current.questions[lesson ?? 0].why}</p>
                </div>
              )}
              <button
                className="pilot-button"
                disabled={answer === null}
                onClick={() => {
                  if (!checked) {
                    setChecked(true);
                    return;
                  }
                  if (checked) {
                    finish();
                    return;
                  }
                  setStep((s) => s + 1);
                  setAnswer(null);
                  setChecked(false);
                }}
              >
                {checked ? "Finish lesson" : "Check answer"}
                <ArrowRight size={17} />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
