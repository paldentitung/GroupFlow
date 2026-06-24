import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Lock,
  FolderOpen,
  CheckSquare,
  MessageSquare,
  Bell,
  History,
  ChevronRight,
} from "lucide-react";

const Logo = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="6.5" cy="6.5" r="3.2" fill="currentColor" />
    <circle cx="13.5" cy="6.5" r="2.3" fill="currentColor" fillOpacity=".6" />
    <circle cx="6.5" cy="13.5" r="2.3" fill="currentColor" fillOpacity=".6" />
    <circle cx="13.5" cy="13.5" r="3.2" fill="currentColor" />
  </svg>
);

const features = [
  {
    Icon: Lock,
    title: "Secure auth",
    desc: "Register, login, email verification, and forgot password.",
  },
  {
    Icon: FolderOpen,
    title: "Projects",
    desc: "Create projects and invite members by email.",
  },
  {
    Icon: CheckSquare,
    title: "Task management",
    desc: "Assign, track status, accept or reject assignments.",
  },
  {
    Icon: MessageSquare,
    title: "Comments",
    desc: "Per-task threads keep all discussion in context.",
  },
  {
    Icon: Bell,
    title: "Notifications",
    desc: "User-specific alerts with read/unread state.",
  },
  {
    Icon: History,
    title: "Activity log",
    desc: "Full audit history of every team action.",
  },
];

const stats = [
  ["8", "Core modules"],
  ["MERN", "Full-stack"],
  ["1 cmd", "Docker deploy"],
  ["MIT", "Open source"],
];

const steps = [
  {
    n: 1,
    title: "Create your account",
    desc: "Register and verify your email. JWT auth keeps your workspace secure.",
  },
  {
    n: 2,
    title: "Set up a project",
    desc: "Create a project and invite teammates by email. Everyone gets notified.",
  },
  {
    n: 3,
    title: "Assign tasks and collaborate",
    desc: "Add tasks, leave comments, and watch the activity log update live.",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="font-[DM_Sans] bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-[var(--color-surface)]/80 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-[16px] font-semibold tracking-tight">
            <div className="w-8 h-8 rounded-[9px] bg-[var(--color-accent)] flex items-center justify-center text-white">
              <Logo />
            </div>
            GroupFlow
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/login")}
              className="hidden sm:block px-4 py-2 text-[13px] font-medium rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-bg)] transition-colors"
            >
              Log in
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 text-[13px] font-medium bg-[var(--color-accent)] text-white rounded-lg hover:bg-indigo-700 transition-colors"
              style={{ boxShadow: "0 2px 12px rgba(79,70,229,.35)" }}
            >
              Get started free
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-28 sm:py-36 px-6 sm:px-10 text-center border-b border-[var(--color-border)]"
        style={{
          background:
            "linear-gradient(150deg,#1e1b4b 0%,#312e81 38%,#4f46e5 100%)",
        }}
      >
        {/* dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,.10) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 text-[11px] font-semibold uppercase tracking-[0.12em] px-3 py-1 rounded-full mb-6">
            Team collaboration
          </span>

          <h1
            className="text-[48px] sm:text-[60px] text-white leading-[1.1] mb-5 tracking-[-1px]"
            style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}
          >
            Where teams
            <br />
            <em>move together.</em>
          </h1>

          <p className="text-[17px] sm:text-[19px] text-indigo-200 leading-relaxed max-w-[500px] mx-auto mb-10">
            Sync tasks, track progress, and communicate — all in one space built
            for modern teams.
          </p>

          <div className="flex items-center gap-3 justify-center flex-wrap">
            <button
              onClick={() => navigate("/register")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl text-[14px] font-semibold hover:bg-indigo-50 transition-all hover:-translate-y-px active:translate-y-0"
            >
              Start for free <ArrowRight size={15} />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-medium text-white hover:bg-white/10 transition-all"
              style={{ border: "1.5px solid rgba(255,255,255,.3)" }}
            >
              Log in <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <div className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map(([n, l]) => (
            <div key={l}>
              <div className="text-[28px] font-semibold text-[var(--color-accent)] tracking-tight">
                {n}
              </div>
              <div className="text-[12px] text-[var(--color-text-muted)] mt-1 uppercase tracking-wide">
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <section className="py-20 sm:py-24 px-6 sm:px-10 bg-[var(--color-bg)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)] mb-3">
              Features
            </p>
            <h2 className="text-[30px] sm:text-[34px] font-semibold tracking-tight mb-3">
              Everything your team needs
            </h2>
            <p className="text-[16px] text-[var(--color-text-muted)] max-w-md mx-auto leading-relaxed">
              From authentication to notifications — GroupFlow covers the full
              project lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 hover:border-indigo-300 transition-colors"
              >
                <div className="w-10 h-10 bg-[var(--color-accent-light)] rounded-xl flex items-center justify-center mb-5">
                  <Icon size={18} className="text-[var(--color-accent)]" />
                </div>
                <p className="text-[14px] font-semibold mb-2">{title}</p>
                <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 sm:py-24 px-6 sm:px-10 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)] mb-3">
              How it works
            </p>
            <h2 className="text-[30px] sm:text-[34px] font-semibold tracking-tight mb-3">
              Up and running in minutes
            </h2>
            <p className="text-[16px] text-[var(--color-text-muted)] max-w-md mx-auto leading-relaxed">
              Three steps from zero to a fully deployed team workspace.
            </p>
          </div>

          <div className="flex flex-col max-w-[560px] mx-auto">
            {steps.map(({ n, title, desc }) => (
              <div
                key={n}
                className="flex gap-5 py-7 border-b border-[var(--color-border)] last:border-b-0"
              >
                <div
                  className="w-9 h-9 rounded-full bg-[var(--color-accent)] text-white text-[13px] font-semibold flex items-center justify-center shrink-0 mt-0.5"
                  style={{ boxShadow: "0 4px 14px rgba(79,70,229,.3)" }}
                >
                  {n}
                </div>
                <div className="pt-0.5">
                  <p className="text-[15px] font-semibold mb-1.5">{title}</p>
                  <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-24 px-6 sm:px-10 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(150deg,#1e1b4b 0%,#312e81 38%,#4f46e5 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 max-w-xl mx-auto">
          <h2 className="text-[32px] sm:text-[38px] font-semibold text-white mb-4 tracking-tight leading-tight">
            Ready to get your team organized?
          </h2>
          <p className="text-[16px] text-indigo-200 mb-9 leading-relaxed">
            Open source and free to self-host. Deploy with a single Docker
            command.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-indigo-600 rounded-xl text-[14px] font-semibold hover:bg-indigo-50 transition-all hover:-translate-y-px active:translate-y-0"
          >
            {/* <Github size={16} /> */}
            Get started free
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[12px] text-[var(--color-text-muted)]">
            © 2025 GroupFlow · MIT License
          </span>
          <div className="flex items-center gap-6 text-[12px] text-[var(--color-text-muted)]">
            <a
              href="https://github.com/paldentitung/GroupFlow"
              className="hover:text-[var(--color-text-primary)] transition-colors"
            >
              GitHub
            </a>
            <a
              href="#"
              className="hover:text-[var(--color-text-primary)] transition-colors"
            >
              Docs
            </a>
            <a
              href="#"
              className="hover:text-[var(--color-text-primary)] transition-colors"
            >
              API
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
