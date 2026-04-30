export const DeleteConfirm = ({ onConfirm, onCancel, isDeleting }) => (
  <div
    className="flex items-center gap-3 bg-surface border border-border
    rounded-lg px-4 py-3"
  >
    <p className="text-sm text-text-body">
      Are you sure? This cannot be undone.
    </p>
    <div className="flex items-center gap-2 ml-auto shrink-0">
      <button
        onClick={onCancel}
        disabled={isDeleting}
        className="text-[13px] text-text-muted hover:text-text-primary
          transition-colors duration-150 disabled:opacity-50"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        disabled={isDeleting}
        className="text-[13px] font-medium bg-accent text-white px-4 py-1.5
          rounded-lg hover:bg-accent/90 transition-all duration-150
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isDeleting ? "Deleting..." : "Yes, delete"}
      </button>
    </div>
  </div>
);
