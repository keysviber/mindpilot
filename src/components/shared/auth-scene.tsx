import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import { PilotMascot } from "./pilot-mascot";
export function AuthScene({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-scene">
      <aside className="auth-story">
        <Link href="/" className="pilot-brand">
          <span className="brand-symbol">
            <BrainCircuit size={25} />
          </span>
          mindpilot<span className="brand-dot">.</span>
        </Link>
        <PilotMascot />
        <div className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</div>
        <h2>
          A little curiosity.
          <br />A world of possibility.
        </h2>
        <p>
          Make space for small wins, fresh ideas, and a study routine you'll
          actually look forward to.
        </p>
      </aside>
      <main className="auth-form-side">
        <div>{children}</div>
      </main>
    </div>
  );
}
