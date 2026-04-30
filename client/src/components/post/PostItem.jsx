import { Link } from "react-router-dom";
import { formatDate } from "../../lib/utils";

export const PostItem = ({ post }) => (
  <Link
    to={`/post/${post.slug}`}
    className="block py-6 border-b border-border last:border-none
      hover:opacity-75 transition-opacity duration-200"
  >
    <p className="text-[11px] tracking-[1.5px] uppercase text-accent font-medium mb-2">
      {post.category}
    </p>
    <h2
      className="text-xl font-medium text-text-primary leading-snug mb-2"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {post.title}
    </h2>
    <p className="text-[13px] text-text-muted leading-relaxed mb-3 line-clamp-2">
      {post.excerpt}
    </p>
    <div className="flex items-center gap-2 text-[12px] text-text-muted">
      <span>{formatDate(post.publishedAt)}</span>
      <span className="text-border">·</span>
      <span>{post.readingTime} min read</span>
    </div>
  </Link>
);
