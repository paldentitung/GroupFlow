import { useState } from "react";
import { Link } from "react-router-dom";

/* ─── tiny inline icons ─────────────────────────────────────── */
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

const EyeOn = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOff = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const Spinner = () => (
  <svg
    className="animate-spin"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="rgba(255,255,255,.35)"
      strokeWidth="3"
    />
    <path
      d="M12 2a10 10 0 0110 10"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

/* ─── validation ─────────────────────────────────────────────── */
const validators = {
  email: (v) => {
    if (!v) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email.";
    return null;
  },
  password: (v) => {
    if (!v) return "Password is required.";
    if (v.length < 8) return "At least 8 characters required.";
    return null;
  },
};

/* ─── FieldError ─────────────────────────────────────────────── */
function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="mt-1 text-xs" style={{ color: "var(--color-red)" }}>
      {msg}
    </p>
  );
}

/* ─── LoginPage ──────────────────────────────────────────────── */
const LoginPage = () => {
  const [fields, setFields] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  const blur = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((er) => ({ ...er, [key]: validators[key](fields[key]) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      email: validators.email(fields.email),
      password: validators.password(fields.password),
    };
    setTouched({ email: true, password: true });
    setErrors(newErrors);
    if (newErrors.email || newErrors.password) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // replace with real auth call
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
          {/* dot grid overlay */}
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

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-2.5">
            <div
              className="w-[34px] h-[34px] rounded-xl flex items-center justify-center text-white"
              style={{ background: "rgba(255,255,255,.18)" }}
            >
              <Logo />
            </div>
            <span className="text-white font-medium text-base tracking-tight">
              GroupFlow
            </span>
          </div>

          {/* Headline + stat cards */}
          <div className="relative z-10 flex-1 flex flex-col justify-center mt-8">
            <p className="text-indigo-300 text-[11px] font-semibold uppercase tracking-widest mb-4">
              Team collaboration
            </p>
            <h2
              className="text-white text-4xl leading-snug mb-4"
              style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}
            >
              Where teams
              <br />
              <em>move together.</em>
            </h2>
            <p className="text-indigo-200 text-sm leading-relaxed max-w-[230px]">
              Sync tasks, track progress, and communicate — all in one space.
            </p>
          </div>

          {/* Avatars */}
          <div className="relative z-10 flex items-center gap-2">
            {[
              ["A", "#a78bfa"],
              ["M", "#60a5fa"],
              ["S", "#f472b6"],
              ["+", "#818cf8"],
            ].map(([label, bg], i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-indigo-400 flex items-center justify-center text-white text-[11px] font-medium"
                style={{ background: bg, marginLeft: i ? "-8px" : 0 }}
              >
                {label}
              </div>
            ))}
            <span className="text-indigo-200 text-[11px] ml-2">
              2,400+ teams inside
            </span>
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

          <h1
            className="text-[2rem] font-normal mb-1"
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "Georgia, serif",
            }}
          >
            Welcome back
          </h1>
          <p
            className="text-sm mb-8"
            style={{ color: "var(--color-text-muted)" }}
          >
            Sign in to your workspace to continue
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            {/* Email */}
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
                value={fields.email}
                onChange={set("email")}
                onBlur={blur("email")}
                className={inputCls("email")}
                style={{
                  background: "var(--color-surface)",
                  color: "var(--color-text-primary)",
                }}
              />
              <FieldError msg={touched.email && errors.email} />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  className="text-sm font-medium"
                  style={{ color: "var(--color-text-primary)" }}
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-medium hover:underline"
                  style={{ color: "var(--color-accent)" }}
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
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
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "var(--color-text-muted)" }}
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? <EyeOff /> : <EyeOn />}
                </button>
              </div>
              <FieldError msg={touched.password && errors.password} />
            </div>

            {/* Submit */}
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
                  <Spinner />
                  Signing in…
                </>
              ) : (
                "Sign in to GroupFlow"
              )}
            </button>
          </form>

          {/* Divider */}
          <div
            className="flex items-center gap-3 my-6 text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            <div
              className="flex-1 h-px"
              style={{ background: "var(--color-border)" }}
            />
            or
            <div
              className="flex-1 h-px"
              style={{ background: "var(--color-border)" }}
            />
          </div>

          <p
            className="text-center text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold hover:underline"
              style={{ color: "var(--color-accent)" }}
            >
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
