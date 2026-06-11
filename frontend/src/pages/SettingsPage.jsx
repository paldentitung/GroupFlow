import { useState, useEffect, useRef } from "react";
import {
  User,
  Lock,
  Bell,
  Users,
  Camera,
  Trash2,
  Save,
  Check,
  EyeClosed,
  Eye,
} from "lucide-react";
import Header from "../components/Header";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../hooks/useAuth.js";
import Avatar from "../components/Avatar.jsx";
import { updateNotificationPreferences } from "../services/users.service.js";
import { toast } from "react-hot-toast";

const NAV_ITEMS = [
  { key: "profile", label: "Profile", icon: User },
  { key: "security", label: "Security", icon: Lock },
  { key: "notifications", label: "Notifications", icon: Bell },
];

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

function InputField({ label, value, type = "text", onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </label>
      <input
        type={type}
        defaultValue={value}
        onChange={onChange}
        className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
      />
    </div>
  );
}

function RoleBadge({ role }) {
  const colors = {
    Owner: "bg-indigo-50 text-indigo-700",
    Developer: "bg-emerald-50 text-emerald-700",
    "UI/UX": "bg-pink-50 text-pink-700",
    DevOps: "bg-blue-50 text-blue-700",
    Member: "bg-gray-100 text-gray-600",
    "Team Lead": "bg-amber-50 text-amber-700",
  };
  return (
    <span
      className={`text-xs font-medium px-2.5 py-1 rounded-full ${colors[role] || "bg-gray-100 text-gray-600"}`}
    >
      {role}
    </span>
  );
}

function ProfileSection() {
  const [saved, setSaved] = useState(false);

  const { user } = useAuth();
  const { handleUpdateProfile, handleChangeAvatar, handleRemoveAvatar } =
    useProfile();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    phone: "",
  });

  const [avatar, setAvatar] = useState(null);
  const avatarRef = useRef(null);

  const handleAvatarClick = () => {
    avatarRef.current?.click();
  };

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

  const handleSave = async () => {
    try {
      setSaved(true);

      await handleUpdateProfile(form);

      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error(err);
      setSaved(false);
    }
  };

  useEffect(() => {
    if (!avatar) return;

    const upload = async () => {
      try {
        const formData = new FormData();
        formData.append("avatar", avatar);

        await handleChangeAvatar(formData);
      } catch (err) {
        console.error(err);
      }
    };

    upload();
  }, [avatar]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-medium text-gray-900">Profile</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Update your personal information
        </p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
        <Avatar user={user} size={50} />

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              onClick={handleAvatarClick}
              className="flex items-center gap-1.5 bg-indigo-600 text-white text-xs font-medium px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Camera size={13} />
              Change Photo
            </button>

            <input
              type="file"
              className="hidden"
              ref={avatarRef}
              onChange={(e) => setAvatar(e.target.files[0])}
            />

            <button
              onClick={() => {
                window.confirm(" are you sure");
                handleRemoveAvatar();
              }}
              className="flex items-center gap-1.5 border border-gray-200 text-red-500 text-xs font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Trash2 size={13} />
              Remove
            </button>
          </div>

          <p className="text-xs text-gray-400">JPG, PNG or GIF — max 2MB</p>
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="First Name"
          value={form.firstName}
          onChange={(e) =>
            setForm((p) => ({ ...p, firstName: e.target.value }))
          }
        />

        <InputField
          label="Last Name"
          value={form.lastName}
          onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
        />

        <InputField
          label="Bio"
          value={form.bio}
          onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
        />

        <InputField
          label="Phone"
          value={form.phone}
          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
        />
      </div>

      <InputField label="Email Address" value={user?.email} disabled />

      <button
        onClick={handleSave}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
          saved
            ? "bg-emerald-600 text-white"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        {saved ? <Check size={15} /> : <Save size={15} />}
        {saved ? "Saved!" : "Save Changes"}
      </button>
    </div>
  );
}

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

  const handleSave = async () => {
    if (form.newPassword !== form.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    await handleChangePassword({
      password: form.password,
      newPassword: form.newPassword,
    });
  };

  const toggleShow = (field) => {
    setShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-medium text-gray-900">Security</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage your password and account security
        </p>
      </div>

      <div className="space-y-4">
        {/* Current Password */}
        <div className="relative">
          <InputField
            label="Current Password"
            type={show.password ? "text" : "password"}
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
          />

          <button
            type="button"
            onClick={() => toggleShow("password")}
            className="absolute right-3 top-9 text-gray-500"
          >
            {show.password ? <EyeClosed size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* New + Confirm */}
        <div className="grid grid-cols-2 gap-4">
          {/* New Password */}
          <div className="relative">
            <InputField
              label="New Password"
              type={show.newPassword ? "text" : "password"}
              value={form.newPassword}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
            />

            <button
              type="button"
              onClick={() => toggleShow("newPassword")}
              className="absolute right-3 top-9 text-gray-500"
            >
              {show.newPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <InputField
              label="Confirm Password"
              type={show.confirmPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
            />

            <button
              type="button"
              onClick={() => toggleShow("confirmPassword")}
              className="absolute right-3 top-9 text-gray-500"
            >
              {show.confirmPassword ? (
                <EyeClosed size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="flex items-center gap-2 bg-indigo-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        <Lock size={14} />
        Update Password
      </button>
    </div>
  );
}
function NotificationsSection() {
  const { user } = useAuth();

  const [notifs, setNotifs] = useState({
    taskAssigned: user?.notificationPreferences?.taskAssigned ?? true,
    deadlineReminder: user?.notificationPreferences?.deadlineReminder ?? true,
    newComment: user?.notificationPreferences?.newComment ?? false,
    projectStatus: user?.notificationPreferences?.projectStatus ?? true,
  });
  const handleToggle = async (key, val) => {
    const updated = { ...notifs, [key]: val };
    setNotifs(updated);

    try {
      await updateNotificationPreferences(updated);
    } catch (error) {
      setNotifs(notifs);
      toast.error("Failed to save preferences");
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
          <div
            key={item.key}
            className="flex items-center justify-between py-4"
          >
            <div>
              <p className="text-sm font-medium text-gray-800">{item.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
            </div>
            <Toggle
              enabled={notifs[item.key]}
              onChange={(val) => handleToggle(item.key, val)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const SECTIONS = {
  profile: <ProfileSection />,
  security: <SecuritySection />,
  notifications: <NotificationsSection />,
};

export default function SettingsPage() {
  const [active, setActive] = useState("profile");
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#F7F8FA] pb-20 md:pb-0"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Header title="Settings" showButton={false} />
      <div className="p-4 md:p-8">
        {/* Desktop layout */}
        <div className="hidden md:flex gap-6 items-start">
          <nav className="w-48 flex-shrink-0 bg-white border border-gray-200 rounded-xl p-2">
            {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
              const isActive = active === key;
              return (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all mb-0.5 last:mb-0 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 font-medium"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  <Icon size={15} className="flex-shrink-0" />
                  {label}
                </button>
              );
            })}
          </nav>
          <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 min-h-[420px]">
            {SECTIONS[active]}
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden bg-white border border-gray-200 rounded-xl p-5 min-h-[420px]">
          {SECTIONS[active]}
        </div>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex bg-white border-t border-gray-200 md:hidden pb-safe">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`relative flex-1 flex flex-col items-center justify-center py-2.5 gap-1 text-xs transition-colors ${
                isActive ? "text-indigo-600 font-medium" : "text-gray-400"
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
              {isActive && (
                <span className="absolute bottom-0 w-6 h-0.5 bg-indigo-600 rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
