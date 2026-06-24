import { useState, useEffect, useRef } from "react";
import {
  User,
  Lock,
  Bell,
  Camera,
  Trash2,
  Save,
  Check,
  EyeClosed,
  Eye,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Header from "../components/Header";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../hooks/useAuth.js";
import Avatar from "../components/Avatar.jsx";
import { updateNotificationPreferences } from "../services/users.service.js";
import MainButton from "../components/MainButton.jsx";

const NAV_ITEMS = [
  { key: "profile", label: "Profile", icon: User },
  { key: "security", label: "Security", icon: Lock },
  { key: "notifications", label: "Notifications", icon: Bell },
];

// ── Shared inline feedback components ──────────────────────────────────────

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1">
      <AlertCircle size={12} className="flex-shrink-0" />
      {message}
    </p>
  );
}

function FormError({ message }) {
  if (!message) return null;
  return (
    <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
      <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
      <span>{message}</span>
    </div>
  );
}

function FormSuccess({ message }) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3">
      <CheckCircle2 size={15} className="flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}

// ── Toggle ──────────────────────────────────────────────────────────────────

function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${
        enabled ? "bg-indigo-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// ── InputField ──────────────────────────────────────────────────────────────

function InputField({
  label,
  value,
  type = "text",
  onChange,
  error,
  disabled,
  children,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          defaultValue={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed ${
            error
              ? "border-red-300 focus:ring-red-400 text-red-900"
              : "border-gray-200 focus:ring-indigo-500 text-gray-900"
          }`}
        />
        {children}
      </div>
      <FieldError message={error} />
    </div>
  );
}

// ── ProfileSection ──────────────────────────────────────────────────────────

function ProfileSection() {
  const { user } = useAuth();
  const { handleUpdateProfile, handleChangeAvatar, handleRemoveAvatar } =
    useProfile();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    phone: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [saved, setSaved] = useState(false);
  const [avatarError, setAvatarError] = useState("");

  const avatarRef = useRef(null);

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        bio: user.bio || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required.";
    if (!form.lastName.trim()) errs.lastName = "Last name is required.";
    if (form.phone && !/^\+?[\d\s\-()]{7,15}$/.test(form.phone))
      errs.phone = "Enter a valid phone number.";
    return errs;
  };

  const handleSave = async () => {
    setFormError("");
    const errs = validate();
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    try {
      setSaved(true);
      await handleUpdateProfile(form);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setSaved(false);
      setFormError(
        err?.response?.data?.message ||
          "Failed to update profile. Please try again.",
      );
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarError("");

    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      setAvatarError("Only JPG, PNG, or GIF files are allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setAvatarError("File is too large. Maximum size is 2 MB.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("avatar", file);
      await handleChangeAvatar(formData);
    } catch (err) {
      setAvatarError("Failed to upload photo. Please try again.");
    }
  };

  const handleRemove = async () => {
    if (!window.confirm("Are you sure you want to remove your photo?")) return;
    setAvatarError("");
    try {
      await handleRemoveAvatar();
    } catch (err) {
      setAvatarError("Failed to remove photo. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-medium text-gray-900">Profile</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Update your personal information
        </p>
      </div>

      {/* Avatar */}
      <div className="pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Avatar user={user} size={50} />
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="file"
                className="hidden"
                ref={avatarRef}
                accept="image/jpeg,image/png,image/gif"
                onChange={handleAvatarChange}
              />
              <MainButton onClick={() => avatarRef.current?.click()}>
                <Camera size={15} />
                Change Photo
              </MainButton>
              <button
                onClick={handleRemove}
                className="flex items-center gap-1.5 border border-gray-200 text-red-500 text-xs font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 size={14} />
                Remove
              </button>
            </div>
            <p className="text-xs text-gray-400">JPG, PNG or GIF — max 2 MB</p>
          </div>
        </div>
        {avatarError && (
          <p className="flex items-center gap-1.5 text-xs text-red-500 mt-3">
            <AlertCircle size={12} className="flex-shrink-0" />
            {avatarError}
          </p>
        )}
      </div>

      {/* Fields */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="First Name"
          value={form.firstName}
          error={fieldErrors.firstName}
          onChange={(e) => {
            setForm((p) => ({ ...p, firstName: e.target.value }));
            setFieldErrors((p) => ({ ...p, firstName: "" }));
          }}
        />
        <InputField
          label="Last Name"
          value={form.lastName}
          error={fieldErrors.lastName}
          onChange={(e) => {
            setForm((p) => ({ ...p, lastName: e.target.value }));
            setFieldErrors((p) => ({ ...p, lastName: "" }));
          }}
        />
        <InputField
          label="Bio"
          value={form.bio}
          onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
        />
        <InputField
          label="Phone"
          value={form.phone}
          error={fieldErrors.phone}
          onChange={(e) => {
            setForm((p) => ({ ...p, phone: e.target.value }));
            setFieldErrors((p) => ({ ...p, phone: "" }));
          }}
        />
      </div>

      <InputField label="Email Address" value={user?.email} disabled />

      <FormError message={formError} />

      <MainButton onClick={handleSave}>
        {saved ? <Check size={15} /> : <Save size={15} />}
        {saved ? "Saved!" : "Save Changes"}
      </MainButton>
    </div>
  );
}

// ── SecuritySection ─────────────────────────────────────────────────────────

function SecuritySection() {
  const { handleChangePassword } = useProfile();

  const [form, setForm] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState({
    password: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");

  const toggleShow = (field) => setShow((p) => ({ ...p, [field]: !p[field] }));

  const validate = () => {
    const errs = {};
    if (!form.password) errs.password = "Current password is required.";
    if (!form.newPassword) {
      errs.newPassword = "New password is required.";
    } else if (form.newPassword.length < 8) {
      errs.newPassword = "Must be at least 8 characters.";
    }
    if (!form.confirmPassword) {
      errs.confirmPassword = "Please confirm your new password.";
    } else if (form.newPassword !== form.confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }
    return errs;
  };

  const handleSave = async () => {
    setFormError("");
    const errs = validate();
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    try {
      await handleChangePassword({
        password: form.password,
        newPassword: form.newPassword,
      });
      setForm({ password: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      const msg = err?.response?.data?.message || "";
      if (
        msg.toLowerCase().includes("current") ||
        msg.toLowerCase().includes("incorrect")
      ) {
        setFieldErrors({ password: "Current password is incorrect." });
      } else {
        setFormError(msg || "Failed to update password. Please try again.");
      }
    }
  };

  const eyeButton = (field) => (
    <button
      type="button"
      onClick={() => toggleShow(field)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
    >
      {show[field] ? <EyeClosed size={16} /> : <Eye size={16} />}
    </button>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-medium text-gray-900">Security</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage your password and account security
        </p>
      </div>

      <div className="space-y-4">
        <InputField
          label="Current Password"
          type={show.password ? "text" : "password"}
          value={form.password}
          error={fieldErrors.password}
          onChange={(e) => {
            setForm((p) => ({ ...p, password: e.target.value }));
            setFieldErrors((p) => ({ ...p, password: "" }));
          }}
        >
          {eyeButton("password")}
        </InputField>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="New Password"
            type={show.newPassword ? "text" : "password"}
            value={form.newPassword}
            error={fieldErrors.newPassword}
            onChange={(e) => {
              setForm((p) => ({ ...p, newPassword: e.target.value }));
              setFieldErrors((p) => ({ ...p, newPassword: "" }));
            }}
          >
            {eyeButton("newPassword")}
          </InputField>

          <InputField
            label="Confirm Password"
            type={show.confirmPassword ? "text" : "password"}
            value={form.confirmPassword}
            error={fieldErrors.confirmPassword}
            onChange={(e) => {
              setForm((p) => ({ ...p, confirmPassword: e.target.value }));
              setFieldErrors((p) => ({ ...p, confirmPassword: "" }));
            }}
          >
            {eyeButton("confirmPassword")}
          </InputField>
        </div>
      </div>

      <FormError message={formError} />

      <MainButton onClick={handleSave}>
        <Lock size={14} />
        Update Password
      </MainButton>
    </div>
  );
}

// ── NotificationsSection ────────────────────────────────────────────────────

function NotificationsSection() {
  const { user } = useAuth();

  const [notifs, setNotifs] = useState({
    taskAssigned: user?.notificationPreferences?.taskAssigned ?? true,
    deadlineReminder: user?.notificationPreferences?.deadlineReminder ?? true,
    newComment: user?.notificationPreferences?.newComment ?? false,
    projectStatus: user?.notificationPreferences?.projectStatus ?? true,
  });

  const [toggleErrors, setToggleErrors] = useState({});

  const handleToggle = async (key, val) => {
    const previous = notifs[key];
    setNotifs((p) => ({ ...p, [key]: val }));
    setToggleErrors((p) => ({ ...p, [key]: "" }));

    try {
      await updateNotificationPreferences({ ...notifs, [key]: val });
    } catch {
      setNotifs((p) => ({ ...p, [key]: previous }));
      setToggleErrors((p) => ({
        ...p,
        [key]: "Failed to save. Please try again.",
      }));
    }
  };

  const items = [
    {
      key: "taskAssigned",
      label: "Task assigned",
      sub: "When a task is assigned to you",
    },
    {
      key: "newComment",
      label: "Mentions",
      sub: "When someone mentions you in a comment",
    },
    {
      key: "projectStatus",
      label: "Project status updates",
      sub: "When a project status changes",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-medium text-gray-900">Notifications</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Choose what you want to be notified about
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <div key={item.key} className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {item.label}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
              </div>
              <Toggle
                enabled={notifs[item.key]}
                onChange={(val) => handleToggle(item.key, val)}
              />
            </div>
            {toggleErrors[item.key] && (
              <p className="flex items-center gap-1.5 text-xs text-red-500 mt-2">
                <AlertCircle size={12} className="flex-shrink-0" />
                {toggleErrors[item.key]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

const SECTIONS = {
  profile: ProfileSection,
  security: SecuritySection,
  notifications: NotificationsSection,
};

export default function SettingsPage() {
  const [active, setActive] = useState("profile");
  const ActiveSection = SECTIONS[active];

  return (
    <div
      className="min-h-screen bg-[#F7F8FA] pb-20 md:pb-0"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Header title="Settings" showButton={false} />

      <div className="p-4 md:p-8">
        {/* Desktop */}
        <div className="hidden md:flex gap-6 items-start">
          <nav className="w-48 flex-shrink-0 bg-white border border-gray-200 rounded-xl p-2">
            {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all mb-0.5 last:mb-0 ${
                  active === key
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                <Icon size={15} className="flex-shrink-0" />
                {label}
              </button>
            ))}
          </nav>

          <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 min-h-[420px]">
            <ActiveSection />
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden bg-white border border-gray-200 rounded-xl p-5 min-h-[420px]">
          <ActiveSection />
        </div>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex bg-white border-t border-gray-200 md:hidden pb-safe">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`relative flex-1 flex flex-col items-center justify-center py-2.5 gap-1 text-xs transition-colors ${
              active === key ? "text-indigo-600 font-medium" : "text-gray-400"
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
            {active === key && (
              <span className="absolute bottom-0 w-6 h-0.5 bg-indigo-600 rounded-full" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
