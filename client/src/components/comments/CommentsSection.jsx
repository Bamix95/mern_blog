import { useState, useRef, useEffect } from "react";
import useComments from "../../hooks/useComments";
import { CommentForm } from "./CommentForm";
import { CommentSkeleton } from "../skeletons/CommentSkeleton";
import { CommentItem } from "./CommentItem";

export const CommentsSection = ({ slug, currentUserId }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef(null);
  const {
    comments,
    isFetching,
    isSubmitting,
    fetchComments,
    handleAddComment,
    handleDeleteComment,
  } = useComments(slug);

  const handleReveal = () => {
    setIsRevealed(true);
    fetchComments();
  };

  useEffect(() => {
    if (isRevealed && sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isRevealed]);

  return (
    <div ref={sectionRef} className="mt-16 pt-8 border-t border-border">
      {!isRevealed && (
        <button
          onClick={handleReveal}
          className="text-sm font-medium border border-border text-text-primary
            px-5 py-2.5 rounded-lg hover:border-ink transition-all duration-150"
        >
          Show comments
        </button>
      )}

      {isRevealed && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-[11px] tracking-[2px] uppercase text-text-muted">
              Comments
              {comments.length > 0 && (
                <span className="ml-2 text-text-primary font-medium">
                  {comments.length}
                </span>
              )}
            </p>
            <button
              onClick={() => setIsRevealed(false)}
              className="text-[12px] text-text-muted hover:text-text-primary
                transition-colors duration-150"
            >
              Hide
            </button>
          </div>

          <CommentForm
            onSubmit={handleAddComment}
            isSubmitting={isSubmitting}
          />

          {isFetching &&
            Array.from({ length: 3 }).map((_, i) => (
              <CommentSkeleton key={i} />
            ))}

          {!isFetching && comments.length === 0 && (
            <p className="text-sm text-text-muted py-6 text-center">
              No comments yet. Be the first to respond.
            </p>
          )}

          {!isFetching && comments.length > 0 && (
            <div>
              {comments.map((comment) => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  currentUserId={currentUserId}
                  onDelete={handleDeleteComment}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
