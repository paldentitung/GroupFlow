import { useState } from "react";

// Avatar color map — matches your CSS variable palette
const AVATAR_MAP = {
  AK: "bg-indigo-100 text-indigo-700",
  NP: "bg-pink-100 text-pink-800",
  SR: "bg-yellow-100 text-yellow-800",
  MJ: "bg-emerald-100 text-emerald-800",
  LT: "bg-red-100 text-red-700",
  YO: "bg-violet-100 text-violet-800",
};

function Avatar({ initials, size = "w-7 h-7", text = "text-[10px]" }) {
  const colors = AVATAR_MAP[initials] || "bg-indigo-100 text-indigo-700";
  return (
    <div
      className={`${size} ${text} ${colors} rounded-full flex items-center justify-center font-semibold shrink-0 tracking-wide`}
    >
      {initials}
    </div>
  );
}

const INITIAL_COMMENTS = [
  {
    id: 1,
    initials: "AK",
    name: "Alex Kim",
    time: "2h ago",
    body: "Pushed initial commit, ready for review.",
  },
  {
    id: 2,
    initials: "NP",
    name: "Nina Park",
    time: "Yesterday",
    body: "Updated the wireframes — let me know if anything blocks dev.",
  },
];

export default function TaskSidebar({ onClose }) {
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [input, setInput] = useState("");

  const postComment = () => {
    const text = input.trim();
    if (!text) return;
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        initials: "YO",
        name: "You",
        time: "just now",
        body: text,
      },
    ]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      postComment();
    }
  };

  return (
    <div className="w-[420px] bg-white border border-[#e8eaed] rounded-2xl flex flex-col overflow-hidden font-sans min-h-screen">
      {/* ── Header ── */}
      <div className="px-[22px] pt-5 pb-4 border-b border-[#e8eaed]">
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <span className="text-[15px] font-medium text-[#111827] leading-snug">
            Set up Stripe checkout
          </span>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md text-[#6b7280] hover:bg-[#f7f8fa] text-base shrink-0 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Status badge */}
        <span className="inline-flex items-center gap-1.5 bg-[#f7f8fa] border border-[#e8eaed] rounded-full px-2.5 py-[3px] text-[11px] text-[#6b7280]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6b7280] inline-block" />
          Todo
        </span>

        <p className="text-[13px] text-[#6b7280] leading-relaxed mt-2.5">
          Server-side intent + webhook handling for order confirmation.
        </p>
      </div>

      {/* ── Meta grid ── */}
      <div className="grid grid-cols-2 gap-y-3 px-[22px] py-4 bg-[#f7f8fa] border-b border-[#e8eaed]">
        {/* Project */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-[#6b7280] mb-1">
            Project
          </p>
          <p className="text-[13px] font-medium text-[#111827]">
            E-Commerce Platform
          </p>
        </div>

        {/* Due */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-[#6b7280] mb-1">
            Due
          </p>
          <p className="text-[13px] font-medium text-[#dc2626]">May 20, 2026</p>
        </div>

        {/* Assigned to */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-[#6b7280] mb-1">
            Assigned to
          </p>
          <div className="flex items-center gap-1.5">
            <Avatar initials="SR" size="w-5 h-5" text="text-[8px]" />
            <span className="text-[13px] font-medium text-[#111827]">
              Sam Rivera
            </span>
          </div>
        </div>

        {/* Created */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-[#6b7280] mb-1">
            Created
          </p>
          <p className="text-[13px] font-medium text-[#111827]">Apr 14, 2026</p>
        </div>
      </div>

      {/* ── Comments ── */}
      <div className="px-[22px] pt-[18px]">
        <p className="text-[13px] font-medium text-[#111827] mb-3.5">
          Comments
        </p>

        <div className="flex flex-col gap-2.5">
          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-[#f7f8fa] border border-[#e8eaed] rounded-xl px-3.5 py-3"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Avatar
                    initials={c.initials}
                    size="w-6 h-6"
                    text="text-[9px]"
                  />
                  <span className="text-[13px] font-medium text-[#111827]">
                    {c.name}
                  </span>
                </div>
                <span className="text-[11px] text-[#6b7280]">{c.time}</span>
              </div>
              <p className="text-[13px] text-[#6b7280] leading-[1.55]">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Comment input ── */}
      <div className="flex gap-2.5 items-end px-[22px] py-4 mt-3.5 border-t border-[#e8eaed] ">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a comment..."
          rows={1}
          className="flex-1 bg-[#f7f8fa] border border-[#e8eaed] rounded-lg px-3 py-2 text-[13px] text-[#111827] placeholder:text-[#6b7280] outline-none resize-none min-h-[38px] focus:border-indigo-500 transition-colors"
        />
        <button
          onClick={postComment}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-medium rounded-lg px-4 h-[38px] shrink-0 transition-colors cursor-pointer"
        >
          Post
        </button>
      </div>

      {/* ── Actions ── */}
      <div className="flex items-center justify-between px-[22px] pb-[18px] border-t border-[#e8eaed] pt-3.5 mt-auto ">
        <button className="flex items-center gap-1.5 border border-[#e8eaed] rounded-lg px-3.5 py-2 text-[13px] text-[#dc2626] hover:bg-red-50 transition-colors cursor-pointer">
          🗑 Delete
        </button>
        <button className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-medium rounded-lg px-4 py-2 transition-colors cursor-pointer">
          ✓ Mark complete
        </button>
      </div>
    </div>
  );
}
