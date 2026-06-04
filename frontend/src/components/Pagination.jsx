import React from "react";

const Pagination = ({
  page = 1,
  totalPages = 1,
  total = null,
  onPageChange,
  showInfo = true,
}) => {
  const goPrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const goNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-gray-50/40 flex-wrap gap-3">
      {/* Info */}
      {showInfo && (
        <span className="text-[12px] text-gray-400">
          Page <span className="font-semibold text-gray-600">{page}</span> of{" "}
          <span className="font-semibold text-gray-600">{totalPages}</span>
          {total !== null && (
            <>
              {" "}
              — <span className="font-semibold text-gray-600">
                {total}
              </span>{" "}
              items
            </>
          )}
        </span>
      )}

      {/* Controls */}
      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={goPrev}
          disabled={page <= 1}
          className="w-8 h-8 flex items-center justify-center border rounded-lg disabled:opacity-30 hover:bg-gray-100 transition"
        >
          ←
        </button>

        <button
          onClick={goNext}
          disabled={page >= totalPages}
          className="w-8 h-8 flex items-center justify-center border rounded-lg disabled:opacity-30 hover:bg-gray-100 transition"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Pagination;
