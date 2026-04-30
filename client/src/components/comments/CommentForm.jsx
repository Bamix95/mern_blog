import { useState } from "react";

export const CommentForm = ({ onSubmit, isSubmitting }) => {
  const [value, setValue] = useState("");
  const maxLength = 500;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value.trim(), () => setValue(""));
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="mb-8">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Leave a comment..."
        maxLength={maxLength}
        rows={3}
        className="w-full border border-border px-3 py-2.5 text-sm outline-none
          rounded-lg focus:ring-1 focus:ring-accent transition-all duration-150
          ease-linear bg-card text-text-primary placeholder:text-text-muted
          resize-none leading-relaxed"
      />

      <div className="flex items-center justify-between mt-2">
        <span className="text-[12px] text-text-muted">
          {value.length}/{maxLength}
        </span>
        <button
          type="submit"
          disabled={isSubmitting || !value.trim()}
          className="text-sm font-medium bg-accent text-white px-5 py-2
            rounded-lg hover:bg-accent/90 transition-all duration-150
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Posting..." : "Post comment"}
        </button>
      </div>
    </form>
  );
};
