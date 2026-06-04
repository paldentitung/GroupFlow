import { useEffect, useState } from "react";
import Header from "../components/Header";
import { formatDate } from "../utils/formatDate";
import { getUserHistory } from "../services/historyService";
import { getInitials } from "../utils/getInitials";
import { Search } from "lucide-react";
import { useAddProject } from "../contexts/AddProjectContext";

const entityIcon = {
  task: { bg: "bg-[#eef2ff]", color: "text-[#4f46e5]" },
  comment: { bg: "bg-[#ecfdf5]", color: "text-[#059669]" },
};

const actionBadge = {
  created: "bg-[#ecfdf5] text-[#059669]",
  assigned: "bg-[#fff7ed] text-[#d97706]",
  completed: "bg-[#f0fdf4] text-[#059669]",
};

function HistoryPage() {
  const [historyData, setHistoryData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const { setIsModalOpen } = useAddProject();
  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const res = await getUserHistory();
        setHistoryData(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserHistory();
  }, []);

  const filteredData = historyData.filter((item) =>
    item.details?.toLowerCase().includes(searchItem.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <Header
        title="History"
        buttonName="New Project"
        onClick={() => setIsModalOpen(true)}
      />

      <div className="p-6">
        {/* Search */}
        <div className="relative w-full mb-5">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]"
          />

          <input
            type="text"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            placeholder="Search activity..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-[#e8eaed] rounded-lg bg-white focus:outline-none focus:border-[#4f46e5]"
          />
        </div>

        {/* History */}
        <div className="bg-white border border-[#e8eaed] rounded-xl px-6 py-5">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#6b7280] mb-4">
            Recent Activity
          </p>

          {historyData.length === 0 ? (
            <p className="text-sm text-center py-6 text-[#6b7280]">
              No history found
            </p>
          ) : filteredData.length === 0 ? (
            <div className="text-center text-red-400 font-semibold py-6">
              Search not found
            </div>
          ) : (
            filteredData.map((item, idx) => {
              const iconStyle = entityIcon[item.entity] || entityIcon.task;
              const badgeStyle =
                actionBadge[item.action] || actionBadge.created;

              return (
                <div
                  key={item._id}
                  className={`flex items-start gap-3 py-3 px-1 rounded-md transition-all duration-300 hover:bg-gray-100 hover:cursor-pointer ${
                    idx < filteredData.length - 1
                      ? "border-b border-[#e8eaed]"
                      : ""
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shrink-0 text-xs font-medium ${iconStyle.bg} ${iconStyle.color}`}
                  >
                    {item.user?.avatar ? (
                      <img
                        src={item.user.avatar}
                        alt={`${item.user?.firstName || ""} ${
                          item.user?.lastName || ""
                        }`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getInitials(item.user?.firstName, item.user?.lastName)
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-[13px] text-[#111827] mb-1">
                      {item.details}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${badgeStyle}`}
                      >
                        {item.action}
                      </span>

                      <span className="text-[11px] text-[#6b7280]">
                        {formatDate(item.createdAt)} · by {item.user?.firstName}{" "}
                        {item.user?.lastName}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
