import React from "react";
import {
  FaBell,
  FaCheckDouble,
  FaTasks,
  FaCheckCircle,
  FaCommentDots,
  FaUserPlus,
  FaEdit,
} from "react-icons/fa";

const TYPE_CONFIG = {
  task_assigned: {
    icon: FaTasks,
    color: "text-blue-600",
    bg: "bg-blue-100",
    label: "Task assigned",
    labelColor: "text-blue-700",
  },
  task_completed: {
    icon: FaCheckCircle,
    color: "text-green-600",
    bg: "bg-green-100",
    label: "Task completed",
    labelColor: "text-green-700",
  },
  comment_added: {
    icon: FaCommentDots,
    color: "text-amber-600",
    bg: "bg-amber-100",
    label: "Comment added",
    labelColor: "text-amber-700",
  },
  member_invited: {
    icon: FaUserPlus,
    color: "text-purple-600",
    bg: "bg-purple-100",
    label: "Member invited",
    labelColor: "text-purple-700",
  },
  project_updated: {
    icon: FaEdit,
    color: "text-rose-600",
    bg: "bg-rose-100",
    label: "Project updated",
    labelColor: "text-rose-700",
  },
};

const NotificationPanel = ({ notifications, onReadAll, onReadSingle }) => {
  return (
    <div className="h-screen w-96 bg-white flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-400 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <FaBell className="text-gray-500 text-base" />
          <h2 className="font-medium text-sm text-gray-900">Notifications</h2>
          {notifications?.length > 0 && (
            <span className="bg-blue-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
              {notifications.length}
            </span>
          )}
        </div>
        <button
          onClick={onReadAll}
          className="flex items-center gap-1.5 text-xs text-gray-400 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          <FaCheckDouble className="text-[11px]" />
          Mark all read
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {notifications?.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center gap-2 text-gray-400">
            <FaBell size={28} />
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => {
            const config = TYPE_CONFIG[notification.type] || {};
            const Icon = config.icon || FaBell;

            return (
              <div
                key={notification._id}
                onClick={() =>
                  !notification.isRead && onReadSingle(notification._id)
                }
                className={`
                  flex items-start gap-3 px-5 py-3.5 border-b border-gray-400
                  transition-colors
                  ${
                    notification.isRead
                      ? "bg-white cursor-default hover:bg-gray-50"
                      : "bg-blue-50 cursor-pointer hover:bg-blue-100"
                  }
                `}
              >
                {/* Icon */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${config.bg || "bg-gray-100"}`}
                >
                  <Icon
                    className={`text-sm ${config.color || "text-gray-500"}`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {config.label && (
                    <p
                      className={`text-[10px] font-semibold uppercase tracking-wider mb-0.5 ${config.labelColor || "text-gray-400"}`}
                    >
                      {config.label}
                    </p>
                  )}
                  <p
                    className={`text-xs leading-relaxed ${notification.isRead ? "text-gray-400" : "text-gray-800 font-medium"}`}
                  >
                    {notification.message}
                  </p>
                  <span className="text-[11px] text-gray-400 mt-1 block">
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                </div>

                {/* Unread dot */}
                {!notification.isRead && (
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
