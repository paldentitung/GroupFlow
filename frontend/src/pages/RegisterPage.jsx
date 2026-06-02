import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const validate = ({ firstName, lastName, email, password }) => {
  const errs = {};
  if (!firstName.trim()) errs.firstName = "First name is required.";
  if (!lastName.trim()) errs.lastName = "Last name is required.";
  if (!email) errs.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errs.email = "Enter a valid email.";
  if (!password) errs.password = "Password is required.";
  else if (password.length < 8)
    errs.password = "At least 8 characters required.";
  return errs;
};

const inputCls =
  "w-full px-4 py-[0.68rem] rounded-[10px] text-sm outline-none transition-all duration-150 border-[1.5px] border-[var(--color-border)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(79,70,229,.1)]";

const RegisterPage = () => {
  const { handleRegister } = useAuth();
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setServerError(null);
    try {
      await handleRegister(fields);
    } catch (err) {
      const message = err.response?.data?.errors?.[0]?.message || err.message;

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

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

        {/* RIGHT PANEL */}
        <div className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-14">
          <div className="lg:hidden mb-8">
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
            Create an account
          </h1>
          <p
            className="text-sm mb-8"
            style={{ color: "var(--color-text-muted)" }}
          >
            Free forever · No credit card needed
          </p>

          {serverError && (
            <p
              className="mb-4 text-sm px-4 py-3 rounded-lg"
              style={{
                background: "rgba(220,38,38,.08)",
                color: "var(--color-red)",
              }}
            >
              {serverError}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-3">
              {[
                ["firstName", "First name", "given-name", "Jane"],
                ["lastName", "Last name", "family-name", "Smith"],
              ].map(([key, label, autoComplete, placeholder]) => (
                <div key={key}>
                  <label
                    htmlFor={key}
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {label}
                  </label>
                  <input
                    id={key}
                    type="text"
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    value={fields[key]}
                    onChange={(e) =>
                      setFields((f) => ({ ...f, [key]: e.target.value }))
                    }
                    className={inputCls}
                  />
                  {errors[key] && (
                    <p
                      className="mt-1 text-xs"
                      style={{ color: "var(--color-red)" }}
                    >
                      {errors[key]}
                    </p>
                  )}
                </div>
              ))}
            </div>

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
                onChange={(e) =>
                  setFields((f) => ({ ...f, email: e.target.value }))
                }
                className={inputCls}
              />
              {errors.email && (
                <p
                  className="mt-1 text-xs"
                  style={{ color: "var(--color-red)" }}
                >
                  {errors.email}
                </p>
              )}
            </div>

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
                  onChange={(e) =>
                    setFields((f) => ({ ...f, password: e.target.value }))
                  }
                  className={`${inputCls} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "var(--color-text-muted)" }}
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p
                  className="mt-1 text-xs"
                  style={{ color: "var(--color-red)" }}
                >
                  {errors.password}
                </p>
              )}
            </div>

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
                  <Loader2 size={16} className="animate-spin" /> Creating
                  account…
                </>
              ) : (
                "Create my account"
              )}
            </button>
          </form>

          <p
            className="text-center text-sm mt-6"
            style={{ color: "var(--color-text-muted)" }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold hover:underline"
              style={{ color: "var(--color-accent)" }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
