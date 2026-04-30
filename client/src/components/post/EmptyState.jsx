import { Link } from "react-router-dom";

export const EmptyState = () => (
  <div className="py-20 text-center">
    <p
      className="font-display text-2xl text-text-primary mb-2"
      style={{ fontFamily: "var(--font-display)" }}
    >
      No stories yet
    </p>
    <p className="text-sm text-text-muted mb-6">
      Be the first to publish something worth reading.
    </p>
    <Link
      to="/write"
      className="inline-block text-sm font-medium border border-ink text-text-primary
        px-5 py-2.5 rounded-lg hover:bg-ink transition-all duration-200"
    >
      Write the first post
    </Link>
  </div>
);
