import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth";
import useAuth from "../hooks/useAuth";
import usePosts from "../hooks/usePosts";
import {
  ProfileHeaderSkeleton,
  StatsSkeleton,
  PostRowSkeleton,
} from "../components/skeletons/ProfileSkeletons";
import { getInitials } from "../lib/utils";
import { EmptyPosts } from "../components/profile/EmptyPost";
import { PostRow } from "../components/profile/PostRow";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const { fetchMyPosts } = usePosts();

  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const loadMyPosts = async () => {
      setIsFetching(true);
      const data = await fetchMyPosts();
      setPosts(data || []);
      setIsFetching(false);
    };

    loadMyPosts();
  }, [fetchMyPosts]);

  console.log(posts);

  const publishedPosts = posts.filter((p) => p.status === "published");
  const draftPosts = posts.filter((p) => p.status === "draft");
  const totalReadTime = posts.reduce((acc, p) => acc + (p.readingTime || 0), 0);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
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
        <div className="flex items-center gap-5">
          <Link
            to="/write"
            className="text-[13px] text-text-muted hover:text-text-primary
              transition-colors duration-150 hidden sm:block"
          >
            Write
          </Link>
          <button
            onClick={handleLogout}
            className="text-[13px] font-medium border border-border text-text-primary
              px-4 py-1.5 rounded-lg hover:border-ink transition-all duration-150"
          >
            Sign out
          </button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 md:px-12 lg:px-0 py-10">
        {isFetching ? (
          <ProfileHeaderSkeleton />
        ) : (
          <div className="pb-8 border-b border-border mb-8">
            <div className="flex items-center gap-5">
              <div
                className="w-16 h-16 rounded-full bg-tag-bg flex items-center
                  justify-center text-xl font-semibold text-tag-text shrink-0"
              >
                {getInitials(user?.name)}
              </div>

              <div>
                <h1
                  className="text-2xl font-bold text-text-primary leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {user?.name}
                </h1>
                <p className="text-sm text-text-muted mt-0.5">{user?.email}</p>
              </div>
            </div>
          </div>
        )}

        {isFetching ? (
          <StatsSkeleton />
        ) : (
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="bg-surface rounded-lg p-4 text-center">
              <p
                className="text-3xl font-bold text-text-primary"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {publishedPosts.length}
              </p>
              <p className="text-[12px] text-text-muted mt-1">Published</p>
            </div>
            <div className="bg-surface rounded-lg p-4 text-center">
              <p
                className="text-3xl font-bold text-text-primary"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {draftPosts.length}
              </p>
              <p className="text-[12px] text-text-muted mt-1">Drafts</p>
            </div>
            <div className="bg-surface rounded-lg p-4 text-center">
              <p
                className="text-3xl font-bold text-text-primary"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {totalReadTime}
              </p>
              <p className="text-[12px] text-text-muted mt-1">Mins written</p>
            </div>
          </div>
        )}

        <div>
          <div
            className="flex items-center justify-between pb-4 mb-2
            border-b border-border"
          >
            <p className="text-[11px] tracking-[2px] uppercase text-text-muted">
              My posts
            </p>
            {!isFetching && posts.length > 0 && (
              <Link
                to="/write"
                className="text-[13px] font-medium text-accent hover:opacity-75
                  transition-opacity duration-150"
              >
                + New post
              </Link>
            )}
          </div>

          {isFetching &&
            Array.from({ length: 4 }).map((_, i) => (
              <PostRowSkeleton key={i} />
            ))}

          {!isFetching && posts.length > 0 && (
            <div>
              {posts.map((post) => (
                <PostRow key={post._id} post={post} />
              ))}
            </div>
          )}

          {/* Empty */}
          {!isFetching && posts.length === 0 && <EmptyPosts />}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
