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
    color: "text-blue-500",
  },

  task_completed: {
    icon: FaCheckCircle,
    color: "text-green-500",
  },

  comment_added: {
    icon: FaCommentDots,
    color: "text-yellow-500",
  },

  member_invited: {
    icon: FaUserPlus,
    color: "text-purple-500",
  },

  project_updated: {
    icon: FaEdit,
    color: "text-orange-500",
  },
};

const NotificationPanel = ({ notifications, onReadAll, onReadSingle }) => {
  return (
    <div className="h-screen w-[400px] bg-white  shadow-xl flex flex-col">
      {/* Header */}

      <div className="p-5 border-b flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <FaBell className="text-gray-600" />

          <h2 className="font-semibold text-lg">Notifications</h2>

          <span className="px-2 py-1 rounded-full bg-gray-100 text-xs">
            {notifications?.length}
          </span>
        </div>

        <button
          onClick={onReadAll}
          className="flex items-center gap-2 text-sm hover:text-blue-600"
        >
          <FaCheckDouble />
          Read All
        </button>
      </div>

      {/* List */}

      <div className="flex-1 overflow-y-auto">
        {notifications?.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center text-gray-500">
            <FaBell size={35} />

            <p className="mt-3">No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => {
            const config = TYPE_CONFIG[notification.type] || {};

            const Icon = config.icon || FaBell;

            return (
              <div
                key={notification._id}
                className={`
                flex
                gap-4
                p-5
                border-b
                hover:bg-gray-50
                transition

                ${notification.isRead ? "bg-white" : "bg-blue-50"}
                `}
              >
                {/* Checkbox */}

                <input
                  type="checkbox"
                  checked={notification.isRead}
                  onChange={() => onReadSingle(notification._id)}
                  className="mt-1"
                />

                {/* Icon */}

                <div className={`${config.color} mt-1`}>
                  <Icon size={18} />
                </div>

                {/* Content */}

                <div className="flex-1">
                  <p
                    className={
                      notification.isRead ? "text-sm" : "text-sm font-medium"
                    }
                  >
                    {notification.message}
                  </p>

                  <span className="text-xs text-gray-500">
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                </div>

                {!notification.isRead && (
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
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
