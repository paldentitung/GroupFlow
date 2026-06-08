import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";

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

/* Simple strength meter */
function StrengthBar({ password }) {
  const score = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#ef4444", "#f59e0b", "#3b82f6", "#22c55e"];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{
              background: i <= score ? colors[score] : "var(--color-border)",
            }}
          />
        ))}
      </div>
      <p className="text-[11px]" style={{ color: colors[score] }}>
        {labels[score]}
      </p>
    </div>
  );
}

const validators = {
  password: (v) => {
    if (!v) return "Password is required.";
    if (v.length < 8) return "At least 8 characters required.";
    return null;
  },
  confirm: (v, pwd) => {
    if (!v) return "Please confirm your password.";
    if (v !== pwd) return "Passwords don't match.";
    return null;
  },
};

const ResetPasswordPage = () => {
  const [fields, setFields] = useState({ password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [show, setShow] = useState({ password: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (key) => (e) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  const blur = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((er) => ({
      ...er,
      [key]:
        key === "confirm"
          ? validators.confirm(fields.confirm, fields.password)
          : validators.password(fields[key]),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      password: validators.password(fields.password),
      confirm: validators.confirm(fields.confirm, fields.password),
    };
    setTouched({ password: true, confirm: true });
    setErrors(newErrors);
    if (newErrors.password || newErrors.confirm) return;
    setLoading(true);
    // placeholder — wire up real logic here
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1200);
  };

  const inputCls = (key) =>
    [
      "w-full px-4 py-[0.68rem] rounded-[10px] text-sm outline-none transition-all duration-150 border-[1.5px]",
      touched[key] && errors[key]
        ? "border-[var(--color-red)] focus:shadow-[0_0_0_3px_rgba(220,38,38,.1)]"
        : "border-[var(--color-border)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(79,70,229,.1)]",
    ].join(" ");

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
              Security
            </p>
            <h2
              className="text-white text-4xl leading-snug mb-4"
              style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}
            >
              New password,
              <br />
              <em>fresh start.</em>
            </h2>
            <p className="text-indigo-200 text-sm leading-relaxed max-w-57">
              Choose something strong. At least 8 characters with a mix of
              letters, numbers, and symbols.
            </p>
          </div>

          {/* Tips */}
          <div className="relative z-10 flex flex-col gap-2">
            {[
              "Use 8+ characters",
              "Mix letters & numbers",
              "Add a special character",
            ].map((tip) => (
              <div key={tip} className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,.5)" }}
                />
                <span className="text-indigo-200 text-[11px]">{tip}</span>
              </div>
            ))}
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

          {!done ? (
            <>
              <h1
                className="text-[2rem] font-normal mb-1"
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "Georgia, serif",
                }}
              >
                Reset password
              </h1>
              <p
                className="text-sm mb-8"
                style={{ color: "var(--color-text-muted)" }}
              >
                Enter and confirm your new password below.
              </p>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-4"
              >
                {/* New password */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "var(--color-text-primary)" }}
                    htmlFor="password"
                  >
                    New password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={show.password ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Create a strong password"
                      value={fields.password}
                      onChange={set("password")}
                      onBlur={blur("password")}
                      className={`${inputCls("password")} pr-11`}
                      style={{
                        background: "var(--color-surface)",
                        color: "var(--color-text-primary)",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShow((s) => ({ ...s, password: !s.password }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: "var(--color-text-muted)" }}
                      aria-label={
                        show.password ? "Hide password" : "Show password"
                      }
                    >
                      {show.password ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <StrengthBar password={fields.password} />
                  <FieldError msg={touched.password && errors.password} />
                </div>

                {/* Confirm password */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "var(--color-text-primary)" }}
                    htmlFor="confirm"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      id="confirm"
                      type={show.confirm ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Re-enter your password"
                      value={fields.confirm}
                      onChange={set("confirm")}
                      onBlur={blur("confirm")}
                      className={`${inputCls("confirm")} pr-11`}
                      style={{
                        background: "var(--color-surface)",
                        color: "var(--color-text-primary)",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShow((s) => ({ ...s, confirm: !s.confirm }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: "var(--color-text-muted)" }}
                      aria-label={
                        show.confirm ? "Hide password" : "Show password"
                      }
                    >
                      {show.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <FieldError msg={touched.confirm && errors.confirm} />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-[0.78rem] rounded-[10px] text-white text-sm font-semibold transition-all duration-150 hover:-translate-y-px disabled:opacity-70 disabled:cursor-not-allowed mt-1"
                  style={{
                    background: "var(--color-accent)",
                    boxShadow: "0 4px 16px rgba(79,70,229,.35)",
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Resetting…
                    </>
                  ) : (
                    "Reset password"
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
                <ShieldCheck
                  size={22}
                  style={{ color: "var(--color-accent)" }}
                />
              </div>
              <h1
                className="text-[2rem] font-normal"
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "Georgia, serif",
                }}
              >
                Password updated
              </h1>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                Your password has been reset successfully. You can now sign in
                with your new password.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-[0.78rem] rounded-[10px] text-white text-sm font-semibold transition-all duration-150 hover:-translate-y-px mt-2"
                style={{
                  background: "var(--color-accent)",
                  boxShadow: "0 4px 16px rgba(79,70,229,.35)",
                }}
              >
                Sign in to GroupFlow
              </Link>
            </div>
          )}

          {/* Back to login */}
          {!done && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
