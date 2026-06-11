import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import { formatDate } from "../utils/formatDate";
import { getUserHistory } from "../services/historyService";
import { getInitials } from "../utils/getInitials";
import { useAddProject } from "../contexts/AddProjectContext";
import { Search } from "lucide-react";
import Pagination from "../components/Pagination";
import Avatar from "../components/Avatar";
// ── Styles ─────────────────────────────────────────────
const entityIcon = {
  task: { bg: "bg-[#eef2ff]", color: "text-[#4f46e5]" },
  comment: { bg: "bg-[#ecfdf5]", color: "text-[#059669]" },
};

const actionBadge = {
  created: "bg-[#ecfdf5] text-[#059669]",
  assigned: "bg-[#fff7ed] text-[#d97706]",
  completed: "bg-[#f0fdf4] text-[#059669]",
};

// ── History Item ───────────────────────────────────────
const HistoryItem = ({ item, isLast }) => {
  const iconStyle = entityIcon[item.entity] || {
    bg: "bg-gray-100",
    color: "text-gray-500",
  };

  const badgeStyle = actionBadge[item.action] || "bg-gray-100 text-gray-500";

  return (
    <div
      className={`flex items-start gap-3 px-5 py-3 hover:bg-gray-50 transition ${
        !isLast ? "border-b border-gray-100" : ""
      }`}
    >
      <Avatar user={item.user} />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-[14.5px] text-gray-800 truncate">{item.details}</p>

        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span
            className={`text-[12px] px-2 py-0.5 rounded-full font-semibold ${badgeStyle}`}
          >
            {item.action}
          </span>

          <span className="text-[12px] text-gray-400">
            {formatDate(item.createdAt)} · {item.user?.firstName}{" "}
            {item.user?.lastName}
          </span>
        </div>
      </div>
    </div>
  );
};

// ── Main Page ──────────────────────────────────────────
function HistoryPage() {
  const [historyData, setHistoryData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const { setIsModalOpen } = useAddProject();

  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const res = await getUserHistory(page, 10);
        setHistoryData(res.data.historys || []);
        setPagination(res.data.pagination);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserHistory();
  }, [page]);

  // optimized filter
  const filteredData = useMemo(() => {
    return historyData.filter((item) =>
      item?.details?.toLowerCase().includes(searchItem.toLowerCase()),
    );
  }, [historyData, searchItem]);

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <Header
        title="History"
        buttonName="New Project"
        onClick={() => setIsModalOpen(true)}
      />

      <div className="p-6">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Search */}
          <div className="relative px-5 py-4 border-b border-gray-100">
            <Search
              size={16}
              className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              placeholder="Search history..."
              className="w-full pl-9 pr-4 py-2 text-[14.5px] rounded-lg border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all"
            />
          </div>

          {/* List */}
          {filteredData.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              No history found
            </div>
          ) : (
            filteredData.map((item, i) => (
              <HistoryItem
                key={item._id}
                item={item}
                isLast={i === filteredData.length - 1}
              />
            ))
          )}

          {/* Pagination */}
        </div>
        <Pagination
          currentPage={pagination?.page || 1}
          totalPages={pagination?.totalPages || 1}
          total={pagination?.total || historyData.length}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default HistoryPage;
