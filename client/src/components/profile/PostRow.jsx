import { Link } from "react-router-dom";
import { formatDate } from "../../lib/utils";
import { StatusBadge } from "./StatusBadge";

export const PostRow = ({ post }) => (
  <div className="py-5 border-b border-border last:border-none">
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <p
          className="text-[11px] tracking-[1.5px] uppercase text-accent
          font-medium mb-1.5"
        >
          {post.category}
        </p>
        <Link
          to={`/post/${post.slug}`}
          className="block text-base font-medium text-text-primary leading-snug
            hover:opacity-70 transition-opacity duration-150 truncate"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {post.title}
        </Link>
        <p className="text-[12px] text-text-muted mt-1.5">
          {post.status === "published"
            ? `Published ${formatDate(post.publishedAt)}`
            : `Draft · saved ${formatDate(post.createdAt)}`}
          &nbsp;·&nbsp;{post.readingTime} min read
        </p>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <StatusBadge status={post.status} />
        <Link
          to={`/post/${post.slug}/edit`}
          className="text-[12px] text-text-muted hover:text-text-primary
            transition-colors duration-150"
        >
          Edit
        </Link>
      </div>
    </div>
  </div>
);
