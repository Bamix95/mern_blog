import { Link } from "react-router-dom";
import { getInitials } from "../../lib/utils";
import { formatDate } from "../../lib/utils";

export const HeroPost = ({ post }) => (
  <Link
    to={`/post/${post.slug}`}
    className="block border-b border-border px-6 py-12 md:px-12 lg:px-20
      hover:opacity-80 transition-opacity duration-200"
  >
    <span
      className="inline-block bg-accent text-white text-[10px] tracking-[1.5px]
        uppercase px-2.5 py-1 rounded-sm mb-4"
    >
      Featured
    </span>

    <p className="text-[11px] tracking-[2px] uppercase text-text-muted mb-4">
      {post.category}
    </p>

    <h1
      className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight
        text-text-primary mb-4 max-w-2xl"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {post.title}
    </h1>

    <p className="text-text-muted text-base leading-relaxed max-w-xl mb-6">
      {post.excerpt}
    </p>

    <div className="flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-full bg-tag-bg flex items-center justify-center
          text-[13px] font-medium text-tag-text shrink-0"
      >
        {getInitials(post.author?.name)}
      </div>
      <p className="text-[13px] text-text-muted">
        <span className="text-text-primary font-medium">
          {post.author?.name}
        </span>
        &nbsp;·&nbsp;{formatDate(post.publishedAt)}&nbsp;·&nbsp;
        {post.readingTime} min read
      </p>
    </div>
  </Link>
);
