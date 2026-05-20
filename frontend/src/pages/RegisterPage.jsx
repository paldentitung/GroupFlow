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

const CheckCircle = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="28" cy="28" r="28" fill="#dcfce7" />
    <polyline
      points="17,28 25,36 39,20"
      stroke="#16a34a"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

/* ─── validation ─────────────────────────────────────────────── */
const validators = {
  firstName: (v) => (!v.trim() ? "First name is required." : null),
  lastName: (v) => (!v.trim() ? "Last name is required." : null),
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

/* ─── password strength ──────────────────────────────────────── */
function getStrength(v) {
  let score = 0;
  if (v.length >= 8) score++;
  if (/[A-Z]/.test(v)) score++;
  if (/[0-9]/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;
  return score;
}

const STRENGTH_COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e"];
const STRENGTH_LABELS = ["Weak", "Fair", "Good", "Strong"];

function StrengthMeter({ value }) {
  if (!value) return null;
  const score = getStrength(value);
  const color = STRENGTH_COLORS[score - 1] || "transparent";
  const label = STRENGTH_LABELS[score - 1] || "";

  return (
    <div className="flex items-center gap-1.5 mt-1.5">
      <div className="flex gap-1 flex-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex-1 h-[3px] rounded-full transition-all duration-300"
            style={{
              background: i <= score ? color : "var(--color-border)",
            }}
          />
        ))}
      </div>
      <span className="text-[11px] min-w-[36px]" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

/* ─── FieldError ─────────────────────────────────────────────── */
function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="mt-1 text-xs" style={{ color: "var(--color-red)" }}>
      {msg}
    </p>
  );
}

/* ─── Success screen ─────────────────────────────────────────── */
function SuccessScreen() {
  return (
    <div className="flex flex-col items-center text-center py-8">
      <CheckCircle />
      <h2
        className="mt-5 text-2xl font-normal"
        style={{
          fontFamily: "Georgia, serif",
          color: "var(--color-text-primary)",
        }}
      >
        You're all set!
      </h2>
      <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
        Welcome to GroupFlow — check your email to verify your address.
      </p>
    </div>
  );
}

/* ─── RegisterPage ───────────────────────────────────────────── */
const RegisterPage = () => {
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (key) => (e) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  const blur = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((er) => ({ ...er, [key]: validators[key](fields[key]) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = Object.fromEntries(
      Object.keys(validators).map((k) => [k, validators[k](fields[k])]),
    );
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
    });
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1800);
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
        style={{ background: "var(--color-surface)", minHeight: 600 }}
      >
        {/* ── LEFT PANEL ── */}
        <div
          className="hidden lg:flex flex-col justify-between p-12 w-[44%] relative overflow-hidden"
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

          {/* Headline */}
          <div className="relative z-10 flex-1 flex flex-col justify-center mt-8">
            <p className="text-indigo-300 text-[11px] font-semibold uppercase tracking-widest mb-4">
              Get started today
            </p>
            <h2
              className="text-white text-4xl leading-snug mb-4"
              style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}
            >
              Your team's
              <br />
              <em>new home base.</em>
            </h2>
            <p className="text-indigo-200 text-sm leading-relaxed max-w-[230px]">
              Set up in minutes. Invite your team, assign tasks, and ship faster
              together.
            </p>
          </div>

          {/* Onboarding steps */}
          <div className="relative z-10 flex flex-col gap-3">
            {[
              { n: "✓", label: "Create your account", done: true },
              { n: "2", label: "Set up your workspace", done: false },
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

          {success ? (
            <SuccessScreen />
          ) : (
            <>
              <h1
                className="text-[2rem] font-normal mb-1"
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "Georgia, serif",
                }}
              >
                Create an account
              </h1>
              <p
                className="text-sm mb-8"
                style={{ color: "var(--color-text-muted)" }}
              >
                Free forever · No credit card needed
              </p>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-4"
              >
                {/* Name row */}
                <div className="grid grid-cols-2 gap-3">
                  {/* First name */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium mb-1.5"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      First name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      autoComplete="given-name"
                      placeholder="Jane"
                      value={fields.firstName}
                      onChange={set("firstName")}
                      onBlur={blur("firstName")}
                      className={inputCls("firstName")}
                      style={{
                        background: "var(--color-surface)",
                        color: "var(--color-text-primary)",
                      }}
                    />
                    <FieldError msg={touched.firstName && errors.firstName} />
                  </div>

                  {/* Last name */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium mb-1.5"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Last name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Smith"
                      value={fields.lastName}
                      onChange={set("lastName")}
                      onBlur={blur("lastName")}
                      className={inputCls("lastName")}
                      style={{
                        background: "var(--color-surface)",
                        color: "var(--color-text-primary)",
                      }}
                    />
                    <FieldError msg={touched.lastName && errors.lastName} />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Work email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@company.com"
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
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPwd ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Min. 8 characters"
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
                  <StrengthMeter value={fields.password} />
                  <FieldError msg={touched.password && errors.password} />
                </div>

                {/* Terms */}
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  By creating an account you agree to our{" "}
                  <a
                    href="#"
                    className="font-medium hover:underline"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="font-medium hover:underline"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Privacy Policy
                  </a>
                  .
                </p>

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
                      Creating account…
                    </>
                  ) : (
                    "Create my account"
                  )}
                </button>
              </form>

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
                className="text-center text-sm mt-3"
                style={{ color: "var(--color-text-muted)" }}
              >
                Do you have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold hover:underline"
                  style={{ color: "var(--color-accent)" }}
                >
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
