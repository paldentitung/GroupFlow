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
} from "lucide-react";
import Header from "../components/Header";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../hooks/useAuth.js";
import Avatar from "../components/Avatar.jsx";
const MEMBERS = [
  {
    initials: "AK",
    name: "Alex Kim",
    email: "alex@example.com",
    role: "Owner",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    initials: "MJ",
    name: "Maya Johnson",
    email: "maya@example.com",
    role: "Developer",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    initials: "SR",
    name: "Sam Rivera",
    email: "sam@example.com",
    role: "Member",
    color: "bg-amber-100 text-amber-600",
  },
  {
    initials: "NP",
    name: "Nina Park",
    email: "nina@example.com",
    role: "UI/UX",
    color: "bg-red-100 text-red-600",
  },
  {
    initials: "LT",
    name: "Leo Torres",
    email: "leo@example.com",
    role: "DevOps",
    color: "bg-blue-100 text-blue-600",
  },
];

const NAV_ITEMS = [
  { key: "profile", label: "Profile", icon: User },
  { key: "security", label: "Security", icon: Lock },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "team", label: "Team", icon: Users },
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
        <Avatar user={user} />

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
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-medium text-gray-900">Security</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage your password and account security
        </p>
      </div>

      <div className="space-y-4">
        <InputField label="Current Password" value="" type="password" />
        <div className="grid grid-cols-2 gap-4">
          <InputField label="New Password" value="" type="password" />
          <InputField label="Confirm Password" value="" type="password" />
        </div>
      </div>

      <div className="pt-2">
        <button className="flex items-center gap-2 bg-indigo-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors">
          <Lock size={14} />
          Update Password
        </button>
      </div>

      <div className="border border-gray-100 rounded-xl p-4 bg-gray-50 mt-6">
        <p className="text-sm font-medium text-gray-700 mb-1">
          Two-factor authentication
        </p>
        <p className="text-xs text-gray-500 mb-3">
          Add an extra layer of security to your account
        </p>
        <button className="text-xs font-medium text-indigo-600 border border-indigo-200 bg-white px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors">
          Enable 2FA
        </button>
      </div>
    </div>
  );
}

function NotificationsSection() {
  const [notifs, setNotifs] = useState({
    taskAssigned: true,
    deadlineReminder: true,
    newComment: false,
    projectStatus: true,
  });

  const items = [
    {
      key: "taskAssigned",
      label: "Task assigned",
      sub: "When a task is assigned to you",
    },
    {
      key: "deadlineReminder",
      label: "Deadline reminder",
      sub: "24 hours before a task is due",
    },
    {
      key: "newComment",
      label: "New comment",
      sub: "When someone comments on your task",
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
              onChange={(val) => setNotifs((p) => ({ ...p, [item.key]: val }))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-medium text-gray-900">Team</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage your project team members
          </p>
        </div>
        <button className="text-xs font-medium bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1.5">
          <Users size={13} />
          Invite Member
        </button>
      </div>

      <div className="divide-y divide-gray-100">
        {MEMBERS.map((m) => (
          <div key={m.email} className="flex items-center gap-3 py-3.5">
            <Avatar initials={m.initials} colorClass={m.color} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{m.name}</p>
              <p className="text-xs text-gray-500 truncate">{m.email}</p>
            </div>
            <RoleBadge role={m.role} />
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
  team: <TeamSection />,
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
