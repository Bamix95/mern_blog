import { Link } from "react-router-dom";

export const PostNotFound = () => (
  <div
    className="min-h-screen flex flex-col items-center justify-center
    text-center px-6"
  >
    <p
      className="text-4xl font-bold text-text-primary mb-3"
      style={{ fontFamily: "var(--font-display)" }}
    >
      Post not found
    </p>
    <p className="text-sm text-text-muted mb-8 max-w-xs">
      This post may have been removed or the link is incorrect.
    </p>
    <Link
      to="/home"
      className="text-sm font-medium border border-ink text-text-primary px-5
        py-2.5 rounded-lg hover:bg-ink transition-all duration-200"
    >
      Back to home
    </Link>
  </div>
);
