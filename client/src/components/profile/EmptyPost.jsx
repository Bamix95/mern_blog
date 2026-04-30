import { Link } from "react-router-dom";

export const EmptyPosts = () => (
  <div className="py-16 text-center">
    <p
      className="text-2xl font-semibold text-text-primary mb-2"
      style={{ fontFamily: "var(--font-display)" }}
    >
      Nothing written yet
    </p>
    <p className="text-sm text-text-muted mb-6">
      Your published posts and drafts will appear here.
    </p>
    <Link
      to="/write"
      className="inline-block text-sm font-medium border border-ink text-text-primary
        px-5 py-2.5 rounded-lg hover:bg-ink hover:text-white transition-all duration-200"
    >
      Write your first post
    </Link>
  </div>
);
