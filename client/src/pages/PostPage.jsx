import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import usePosts from "../hooks/usePosts";
import useAuthStore from "../store/auth";
import { PostPageSkeleton } from "../components/post/PostPageSkeleton";
import { PostNotFound } from "../components/post/PostNotFound";
import { DeleteConfirm } from "../components/post/DeleteConfirm";
import { getInitials, formatDate } from "../lib/utils";
import { RenderBody } from "../components/post/RenderBody";
import { CommentsSection } from "../components/comments/CommentsSection";

const PostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { fetchPostBySlug, handleDeletePost } = usePosts();

  const [post, setPost] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isAuthor = user?._id === post?.author?._id;

  useEffect(() => {
    const loadPost = async () => {
      setIsFetching(true);
      const data = await fetchPostBySlug(slug);
      if (!data) {
        setNotFound(true);
      } else {
        setPost(data);
      }
      setIsFetching(false);
    };

    loadPost();
  }, [slug, fetchPostBySlug]);

  const handleDelete = async () => {
    setIsDeleting(true);
    const success = await handleDeletePost(slug);
    if (success) {
      navigate("/home");
    } else {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="min-h-screen bg-page-bg">
      <nav
        className="h-14 border-b border-border flex items-center justify-between
        px-6 md:px-12 lg:px-20 sticky top-0 bg-page-bg z-10"
      >
        <Link
          to="/home"
          className="text-[22px] font-bold text-text-primary"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Ink<span className="text-accent">well</span>
        </Link>

        {!isFetching && isAuthor && (
          <div className="flex items-center gap-3">
            <Link
              to={`/post/${slug}/edit`}
              className="text-[13px] font-medium border border-border
                text-text-primary px-4 py-1.5 rounded-lg hover:border-ink
                transition-all duration-150"
            >
              Edit
            </Link>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-[13px] font-medium text-accent hover:opacity-75
                transition-opacity duration-150"
            >
              Delete
            </button>
          </div>
        )}
      </nav>

      <main>
        {isFetching && <PostPageSkeleton />}

        {!isFetching && notFound && <PostNotFound />}

        {!isFetching && post && (
          <article className="max-w-3xl mx-auto px-6 md:px-12 lg:px-0 py-10">
            <button
              onClick={() => navigate(-1)}
              className="text-[13px] text-text-muted hover:text-text-primary
                transition-colors duration-150 flex items-center gap-1.5 mb-10"
            >
              ← Back
            </button>

            <p
              className="text-[11px] tracking-[1.5px] uppercase text-accent
              font-medium mb-4"
            >
              {post.category}
            </p>

            <h1
              className="text-3xl md:text-4xl lg:text-[42px] font-bold
                text-text-primary leading-tight mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {post.title}
            </h1>

            <div className="flex items-center gap-3 py-5 border-y border-border mb-10">
              <div
                className="w-9 h-9 rounded-full bg-tag-bg flex items-center
                  justify-center text-[13px] font-medium text-tag-text shrink-0"
              >
                {getInitials(post.author?.name)}
              </div>
              <div>
                <p className="text-[14px] font-medium text-text-primary leading-tight">
                  {post.author?.name}
                </p>
                <p className="text-[12px] text-text-muted mt-0.5">
                  {formatDate(post.publishedAt)}&nbsp;·&nbsp;
                  {post.readingTime} min read
                </p>
              </div>
            </div>

            {showDeleteConfirm && (
              <div className="mb-8">
                <DeleteConfirm
                  onConfirm={handleDelete}
                  onCancel={() => setShowDeleteConfirm(false)}
                  isDeleting={isDeleting}
                />
              </div>
            )}

            <RenderBody body={post.body} />
            <CommentsSection slug={slug} currentUserId={user?._id} />
          </article>
        )}
      </main>
    </div>
  );
};

export default PostPage;
