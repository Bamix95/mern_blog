import { useState } from "react";
import { getInitials, formatDate } from "../../lib/utils";

export const CommentItem = ({ comment, currentUserId, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isOwner = currentUserId === comment.author?._id;

  return (
    <div className="py-5 border-b border-border last:border-none">
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-full bg-tag-bg flex items-center
          justify-center text-[11px] font-medium text-tag-text shrink-0"
        >
          {getInitials(comment.author?.name)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-medium text-text-primary">
                {comment.author?.name}
              </span>
              <span className="text-[11px] text-text-muted">
                {formatDate(comment.createdAt)}
              </span>
            </div>

            {isOwner && (
              <div className="flex items-center gap-2 shrink-0">
                {confirmDelete ? (
                  <>
                    <span className="text-[12px] text-text-muted">Delete?</span>
                    <button
                      onClick={() => onDelete(comment._id)}
                      className="text-[12px] text-accent hover:opacity-75
                        transition-opacity duration-150"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setConfirmDelete(false)}
                      className="text-[12px] text-text-muted hover:text-text-primary
                        transition-colors duration-150"
                    >
                      No
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="text-[12px] text-text-muted hover:text-accent
                      transition-colors duration-150"
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>

          <p className="text-[14px] text-text-body leading-relaxed">
            {comment.body}
          </p>
        </div>
      </div>
    </div>
  );
};
