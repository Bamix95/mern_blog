import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usePosts from "../hooks/usePosts";
import useAuth from "../hooks/useAuth";
import useAuthStore from "../store/auth";
import { HeroSkeleton } from "../components/skeletons/HeroSkeleton";
import { PostItemSkeleton } from "../components/skeletons/PostItemSkeleton";
import { HeroPost } from "../components/post/HeroPost";
import { PostItem } from "../components/post/PostItem";
import { EmptyState } from "../components/post/EmptyState";
import { Menu, X } from "lucide-react";

const CATEGORIES = ["All", "Essays", "Technology", "Travel", "Craft", "Design"];

const CategoryFilter = ({ active, onChange }) => (
  <div className="border-b border-border sticky top-14 bg-page-bg z-10">
    <div
      className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 flex items-center
      gap-1 overflow-x-auto scrollbar-none py-0"
    >
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`text-[12px] font-medium whitespace-nowrap px-4 py-3
            border-b-2 transition-all duration-150
            ${
              active === category
                ? "border-accent text-accent"
                : "border-transparent text-text-muted hover:text-text-primary"
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  </div>
);

const HomePage = () => {
  const { fetchAllPosts } = usePosts();
  const { logout } = useAuth();
  const { isAuthenticated } = useAuthStore();

  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const loadPosts = async () => {
      setIsFetching(true);
      const data = await fetchAllPosts();
      setPosts(data || []);
      setIsFetching(false);
    };

    loadPosts();
  }, [fetchAllPosts]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const [featuredPost, ...restPosts] = filteredPosts;

  return (
    <div className="min-h-screen bg-page-bg">
      <nav
        className="h-14 border-b border-border flex items-center justify-between
        px-6 md:px-12 lg:px-20 sticky top-0 bg-page-bg z-20"
      >
        <Link
          to="/"
          className="text-[22px] font-bold text-text-primary"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Ink<span className="text-accent">well</span>
        </Link>

        <div className="hidden sm:flex items-center gap-5">
          {isAuthenticated ? (
            <>
              <Link
                to="/write"
                className="text-[13px] text-text-muted hover:text-text-primary
                  transition-colors duration-150"
              >
                Write
              </Link>
              <Link
                to="/profile"
                className="text-[13px] text-text-muted hover:text-text-primary
                  transition-colors duration-150"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="text-[13px] font-medium border border-border
                  text-text-primary px-4 py-1.5 rounded-lg hover:border-ink
                  transition-all duration-150"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[13px] text-text-muted hover:text-text-primary
                  transition-colors duration-150"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="text-[13px] font-medium bg-accent text-white px-4
                  py-1.5 rounded-lg hover:bg-accent/90 transition-all duration-150"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="sm:hidden text-text-muted hover:text-text-primary
            transition-colors duration-150"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div
          className="sm:hidden sticky top-14 z-20 bg-page-bg border-b
          border-border px-6 py-4 flex flex-col gap-4"
        >
          {isAuthenticated ? (
            <>
              <Link
                to="/write"
                onClick={closeMobileMenu}
                className="text-[14px] text-text-muted hover:text-text-primary
                  transition-colors duration-150"
              >
                Write
              </Link>
              <Link
                to="/profile"
                onClick={closeMobileMenu}
                className="text-[14px] text-text-muted hover:text-text-primary
                  transition-colors duration-150"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  closeMobileMenu();
                  logout();
                }}
                className="text-left text-[14px] font-medium text-accent
                  hover:opacity-75 transition-opacity duration-150"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="text-[14px] text-text-muted hover:text-text-primary
                  transition-colors duration-150"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="text-[14px] font-medium text-accent hover:opacity-75
                  transition-opacity duration-150"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      )}

      <CategoryFilter active={activeCategory} onChange={handleCategoryChange} />

      <main className="max-w-4xl mx-auto">
        {isFetching ? (
          <div className="px-6 py-12 md:px-12 lg:px-20">
            <HeroSkeleton />
          </div>
        ) : featuredPost ? (
          <HeroPost post={featuredPost} />
        ) : null}

        <div className="px-6 md:px-12 lg:px-20 py-8">
          {!isFetching && filteredPosts.length > 0 && (
            <p
              className="text-[11px] tracking-[2px] uppercase text-text-muted
              pb-4 mb-2 border-b border-border"
            >
              {activeCategory === "All" ? "Recent posts" : activeCategory}
            </p>
          )}

          {isFetching && (
            <div>
              <p
                className="text-[11px] tracking-[2px] uppercase text-text-muted
                pb-4 mb-2 border-b border-border"
              >
                Recent posts
              </p>
              {Array.from({ length: 4 }).map((_, i) => (
                <PostItemSkeleton key={i} />
              ))}
            </div>
          )}

          {!isFetching && restPosts.length > 0 && (
            <div>
              {restPosts.map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </div>
          )}

          {!isFetching &&
            filteredPosts.length === 0 &&
            (activeCategory === "All" ? (
              <EmptyState />
            ) : (
              <div className="py-16 text-center">
                <p
                  className="text-2xl font-semibold text-text-primary mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  No {activeCategory} posts yet
                </p>
                <p className="text-sm text-text-muted">
                  Check back later or{" "}
                  <button
                    onClick={() => setActiveCategory("All")}
                    className="text-accent hover:underline underline-offset-2
                      transition duration-150"
                  >
                    browse all posts
                  </button>
                </p>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
