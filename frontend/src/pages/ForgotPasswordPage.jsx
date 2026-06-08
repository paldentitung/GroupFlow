import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, ArrowLeft, Mail } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
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

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="mt-1 text-xs" style={{ color: "var(--color-red)" }}>
      {msg}
    </p>
  );
}

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const { handleForgotPassword } = useAuth();
  const validate = (v) => {
    if (!v) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    const err = validate(email);
    setError(err);
    if (err) return;
    setLoading(true);
    try {
      await handleForgotPassword(email);
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
      setTouched(true);
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    touched && error
      ? "w-full px-4 py-[0.68rem] rounded-[10px] text-sm outline-none transition-all duration-150 border-[1.5px] border-[var(--color-red)] focus:shadow-[0_0_0_3px_rgba(220,38,38,.1)]"
      : "w-full px-4 py-[0.68rem] rounded-[10px] text-sm outline-none transition-all duration-150 border-[1.5px] border-[var(--color-border)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(79,70,229,.1)]";

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--color-bg)", fontFamily: "inherit" }}
    >
      <div
        className="w-full max-w-5xl flex rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "var(--color-surface)", minHeight: 580 }}
      >
        {/* ── LEFT PANEL ── */}
        <div
          className="hidden lg:flex flex-col justify-between p-12 w-[46%] relative overflow-hidden"
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

          <div className="relative z-10 flex items-center gap-2.5">
            <div
              className="w-8.5 h-8.5 rounded-xl flex items-center justify-center text-white"
              style={{ background: "rgba(255,255,255,.18)" }}
            >
              <Logo />
            </div>
            <span className="text-white font-medium text-base tracking-tight">
              GroupFlow
            </span>
          </div>

          <div className="relative z-10 flex-1 flex flex-col justify-center mt-8">
            <p className="text-indigo-300 text-[11px] font-semibold uppercase tracking-widest mb-4">
              Account recovery
            </p>
            <h2
              className="text-white text-4xl leading-snug mb-4"
              style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}
            >
              Back in a
              <br />
              <em>moment.</em>
            </h2>
            <p className="text-indigo-200 text-sm leading-relaxed max-w-57">
              Enter your email and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Icon illustration */}
          <div className="relative z-10 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,.15)" }}
            >
              <Mail size={18} className="text-white" />
            </div>
            <p className="text-indigo-200 text-[11px] leading-tight">
              Check your spam folder
              <br />
              if you don't see it.
            </p>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div
          className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-14"
          style={{ background: "var(--color-surface)" }}
        >
          {/* mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
              style={{ background: "var(--color-accent)" }}
            >
              <Logo />
            </div>
            <span
              className="font-medium text-base"
              style={{ color: "var(--color-text-primary)" }}
            >
              GroupFlow
            </span>
          </div>

          {!sent ? (
            <>
              <h1
                className="text-[2rem] font-normal mb-1"
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "Georgia, serif",
                }}
              >
                Forgot password?
              </h1>
              <p
                className="text-sm mb-8"
                style={{ color: "var(--color-text-muted)" }}
              >
                No worries — we'll email you a reset link.
              </p>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-4"
              >
                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "var(--color-text-primary)" }}
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => {
                      setTouched(true);
                      setError(validate(email));
                    }}
                    className={inputCls}
                    style={{
                      background: "var(--color-surface)",
                      color: "var(--color-text-primary)",
                    }}
                  />
                  <FieldError msg={touched && error} />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-[0.78rem] rounded-[10px] text-white text-sm font-semibold transition-all duration-150 hover:-translate-y-px disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    background: "var(--color-accent)",
                    boxShadow: "0 4px 16px rgba(79,70,229,.35)",
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </button>
              </form>
            </>
          ) : (
            /* ── Success state ── */
            <div className="flex flex-col items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(79,70,229,.12)" }}
              >
                <Mail size={22} style={{ color: "var(--color-accent)" }} />
              </div>
              <h1
                className="text-[2rem] font-normal"
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "Georgia, serif",
                }}
              >
                Check your inbox
              </h1>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                We sent a password reset link to{" "}
                <span
                  className="font-medium"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {email}
                </span>
                . The link expires in 30 minutes.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setEmail("");
                  setTouched(false);
                }}
                className="text-sm font-medium hover:underline mt-1"
                style={{ color: "var(--color-accent)" }}
              >
                Try a different email
              </button>
            </div>
          )}

          {/* Back to login */}
          <div className="mt-8">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
              style={{ color: "var(--color-text-muted)" }}
            >
              <ArrowLeft size={14} />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
