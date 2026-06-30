import React from "react";
import Avatar from "./Avatar";
import { getInitials } from "../utils/getInitials";

const AvatarGroup = ({ members = [], max = 3 }) => {
  if (!members.length) {
    return <span className="text-[12px] text-gray-400">No members</span>;
  }

  const visible = members.filter(Boolean).slice(0, max);
  const extra = members.length - visible.length;

  return (
    <div className="flex items-center">
      {visible.map((m, i) => {
        // console.log("member", m); // ← log here
        return <Avatar key={m._id || i} user={m} />;
      })}

      {extra > 0 && (
        <span
          className="inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-600 text-[11px] font-bold border border-white"
          style={{ width: 28, height: 28, marginLeft: -8 }}
        >
          +{extra}
        </span>
      )}
    </div>
  );
};

export default AvatarGroup;
