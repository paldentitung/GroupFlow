import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
const VerifyEmailPage = () => {
  const { handleVerifyEmail, loading } = useAuth();
  const { token } = useParams();
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const called = useRef(false);
  useEffect(() => {
    if (!token || called.current) return;
    called.current = true;
    handleVerifyEmail(token);
    if (loading) {
      return <div>Loading</div>;
    }
  }, [token]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--color-bg)" }}
    >
      <div
        className="w-full max-w-5xl flex rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "var(--color-surface)", minHeight: 600 }}
      >
        {/* LEFT PANEL */}
        <div
          className="hidden lg:flex flex-col justify-between p-12 w-[44%] relative overflow-hidden"
          style={{
            background:
              "linear-gradient(150deg,#1e1b4b 0%,#312e81 38%,#4f46e5 100%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,.12) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%)",
            }}
          />
          <div className="relative z-10">
            <span className="text-white font-medium text-base tracking-tight">
              GroupFlow
            </span>
          </div>
          <div className="relative z-10 flex-1 flex flex-col justify-center mt-8">
            <p className="text-indigo-300 text-[11px] font-semibold uppercase tracking-widest mb-4">
              Almost there
            </p>
            <h2
              className="text-white text-4xl leading-snug mb-4"
              style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}
            >
              One last
              <br />
              <em>quick step.</em>
            </h2>
            <p className="text-indigo-200 text-sm leading-relaxed max-w-[230px]">
              Confirming your email keeps your account secure and lets us reach
              you when it matters.
            </p>
          </div>
          <div className="relative z-10 flex flex-col gap-3">
            {[
              { n: "✓", label: "Create your account", done: true },
              { n: "✓", label: "Verify your email", done: true },
              { n: "3", label: "Invite your teammates", done: false },
            ].map(({ n, label, done }) => (
              <div key={label} className="flex items-center gap-3">
                <div
                  className="w-[26px] h-[26px] rounded-full border-[1.5px] flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
                  style={{
                    borderColor: done ? "#4f46e5" : "#818cf8",
                    background: done ? "#4f46e5" : "transparent",
                    color: done ? "#fff" : "#a5b4fc",
                  }}
                >
                  {n}
                </div>
                <span className="text-indigo-200 text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 lg:px-14 text-center">
          <div className="lg:hidden mb-8 self-start">
            <span
              className="font-medium text-base"
              style={{ color: "var(--color-text-primary)" }}
            >
              GroupFlow
            </span>
          </div>

          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: "rgba(79,70,229,.1)" }}
          >
            <Mail size={28} style={{ color: "#4f46e5" }} />
          </div>

          <h1
            className="text-[2rem] font-normal mb-2"
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "Georgia, serif",
            }}
          >
            Check your inbox
          </h1>

          <p
            className="text-sm leading-relaxed max-w-[320px] mb-2"
            style={{ color: "var(--color-text-muted)" }}
          >
            We sent a verification link to
          </p>

          <p
            className="text-sm font-semibold mb-6"
            style={{ color: "var(--color-text-primary)" }}
          >
            jane@company.com
          </p>

          <p
            className="text-sm leading-relaxed max-w-[300px] mb-8"
            style={{ color: "var(--color-text-muted)" }}
          >
            Click the link in that email to activate your account. It may take a
            minute or two to arrive.
          </p>

          {/* Resend */}
          <div
            className="w-full max-w-[320px] px-5 py-4 rounded-[10px] flex items-center justify-between"
            style={{
              background: "rgba(79,70,229,.06)",
              border: "1.5px solid rgba(79,70,229,.15)",
            }}
          >
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              Didn't receive it?
            </p>
            <button
              className="text-xs font-semibold hover:underline"
              style={{
                color: "#4f46e5",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Resend email
            </button>
          </div>

          <p
            className="text-center text-sm mt-8"
            style={{ color: "var(--color-text-muted)" }}
          >
            Wrong email?{" "}
            <Link
              to="/register"
              className="font-semibold hover:underline"
              style={{ color: "#4f46e5" }}
            >
              Go back
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
