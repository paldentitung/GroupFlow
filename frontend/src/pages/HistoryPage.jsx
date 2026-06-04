import Header from "../components/Header";
import { formatDate } from "../utils/formatDate";

const HISTORY_ITEMS = [
  {
    _id: "1",
    entity: "task",
    action: "assigned",
    details: 'Task "Fix login bug" was assigned to you',
    createdAt: new Date(Date.now() - 2 * 60 * 1000),
    user: { firstName: "Alex", lastName: "Johnson" },
  },
  {
    _id: "2",
    entity: "comment",
    action: "created",
    details: 'Comment added on task "Design dashboard"',
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    user: { firstName: "Sarah", lastName: "Lee" },
  },
  {
    _id: "3",
    entity: "task",
    action: "completed",
    details: 'Task "Setup CI/CD pipeline" was completed',
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
    user: { firstName: "You", lastName: "" },
  },
];

const entityIcon = {
  task: { icon: "ti-subtask", bg: "bg-[#eef2ff]", color: "text-[#4f46e5]" },
  comment: { icon: "ti-message", bg: "bg-[#ecfdf5]", color: "text-[#059669]" },
};

const actionBadge = {
  created: "bg-[#ecfdf5] text-[#059669]",
  assigned: "bg-[#fff7ed] text-[#d97706]",
  completed: "bg-[#f0fdf4] text-[#059669]",
};

function HistoryPage() {
  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <Header title="History" showButton={false} />

      <div className="p-6">
        {/* Search Bar */}
        <div className="relative max-w-sm mb-5">
          <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" />
          <input
            type="text"
            placeholder="Search activity..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-[#e8eaed] rounded-lg bg-white focus:outline-none focus:border-[#4f46e5]"
          />
        </div>

        {/* History Card */}
        <div className="bg-white border border-[#e8eaed] rounded-xl px-6 py-5">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#6b7280] mb-4">
            Recent Activity
          </p>

          {HISTORY_ITEMS.map((item, idx) => {
            const ic = entityIcon[item.entity] || entityIcon.task;
            const badge = actionBadge[item.action] || actionBadge.created;

            return (
              <div
                key={item._id}
                className={`flex items-start gap-3 py-3 ${
                  idx < HISTORY_ITEMS.length - 1
                    ? "border-b border-[#e8eaed]"
                    : ""
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${ic.bg} ${ic.color}`}
                >
                  <i className={`ti ${ic.icon}`} />
                </div>

                <div className="flex-1">
                  <p className="text-[13px] text-[#111827] mb-1">
                    {item.details}
                  </p>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${badge}`}
                    >
                      {item.action}
                    </span>

                    <span className="text-[11px] text-[#6b7280]">
                      {formatDate(item.createdAt)} · by {item.user.firstName}{" "}
                      {item.user.lastName}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
