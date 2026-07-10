import Modal from "./Modal";

const DeleteTaskModal = ({ isOpen, onClose, onDelete, loading }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Task"
      className="max-w-md"
      footer={
        <>
          <button
            onClick={onClose}
            className="rounded-lg border border-[#e8eaed] px-4 py-2 text-[13.5px] font-medium text-[#374151] transition-colors hover:bg-[#f7f8fa]"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-[13.5px] font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading && (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            {loading ? "Deleting..." : "Delete"}
          </button>
        </>
      }
    >
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
          <span className="text-[18px] text-red-600">⚠</span>
        </div>
        <div>
          <p className="text-[14px] font-medium text-[#111827]">
            Delete this task?
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-[#6b7280]">
            This action cannot be undone. All comments and history attached to
            this task will be permanently removed.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTaskModal;
