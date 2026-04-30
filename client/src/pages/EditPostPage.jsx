import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import usePosts from "../hooks/usePosts";
import { editPostSchema } from "../validators/post.validator";
import { PostNotFound } from "../components/post/PostNotFound";
import { EditFormSkeleton } from "../components/post/PostPageSkeleton";

const FieldError = ({ message }) =>
  message ? <p className="text-[12px] text-accent mt-1.5">{message}</p> : null;

const inputClass = (hasError) =>
  `w-full border px-3 py-2.5 text-sm outline-none rounded-lg transition-all
  duration-150 ease-linear focus:ring-1 focus:ring-accent bg-card
  text-text-primary placeholder:text-text-muted
  ${hasError ? "border-accent" : "border-border"}`;

const EditPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { fetchPostForEdit, handleUpdatePost } = usePosts();

  const [isFetching, setIsFetching] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("draft");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(editPostSchema),
    defaultValues: {
      title: "",
      category: "",
      body: "",
      status: "draft",
    },
  });

  const bodyValue = watch("body");
  const wordCount = bodyValue?.trim()
    ? bodyValue.trim().split(/\s+/).length
    : 0;
  const estimatedReadTime = Math.ceil(wordCount / 200) || 0;

  useEffect(() => {
    const loadPost = async () => {
      setIsFetching(true);

      const data = await fetchPostForEdit(slug);

      if (!data) {
        setNotFound(true);
        setIsFetching(false);
        return;
      }

      reset({
        title: data.title,
        category: data.category,
        body: data.body,
        status: data.status,
      });

      setCurrentStatus(data.status);
      setIsFetching(false);
    };

    loadPost();
  }, [slug, fetchPostForEdit, reset]);

  const onSubmit = async (data) => {
    setIsUpdating(true);
    const success = await handleUpdatePost(slug, data);
    setIsUpdating(false);
    if (success) {
      navigate(data.status === "published" ? `/post/${slug}` : "/profile");
    }
  };

  const handleToggleStatus = () => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    setValue("status", newStatus);
    setCurrentStatus(newStatus);
    handleSubmit(async (data) => {
      setIsUpdating(true);
      const success = await handleUpdatePost(slug, {
        ...data,
        status: newStatus,
      });
      setIsUpdating(false);
      if (success) {
        navigate(newStatus === "published" ? `/post/${slug}` : "/profile");
      }
    })();
  };

  return (
    <div className="min-h-screen bg-page-bg">
      <nav
        className="h-14 border-b border-border flex items-center justify-between
        px-6 md:px-12 lg:px-20 sticky top-0 bg-page-bg z-10"
      >
        <span
          className="text-[22px] font-bold text-text-primary cursor-pointer"
          style={{ fontFamily: "var(--font-display)" }}
          onClick={() => navigate("/home")}
        >
          Ink<span className="text-accent">well</span>
        </span>

        {!isFetching && wordCount > 0 && (
          <p className="text-[13px] text-text-muted hidden sm:block">
            ~{estimatedReadTime} min read&nbsp;·&nbsp;{wordCount} words
          </p>
        )}
      </nav>

      <main className="max-w-3xl mx-auto px-6 md:px-12 lg:px-0 py-10">
        {!isFetching && notFound && <PostNotFound />}

        {(isFetching || !notFound) && (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2
                className="text-3xl font-semibold text-text-primary"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Edit post
              </h2>

              {!isFetching && (
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] tracking-[1.5px] uppercase font-medium
                      px-2.5 py-1 rounded-sm
                      ${
                        currentStatus === "published"
                          ? "bg-tag-bg text-accent"
                          : "bg-surface text-text-muted"
                      }`}
                  >
                    {currentStatus}
                  </span>

                  <button
                    type="button"
                    onClick={handleToggleStatus}
                    disabled={isUpdating}
                    className="text-[13px] text-text-muted hover:text-text-primary
                      transition-colors duration-150 disabled:opacity-50
                      disabled:cursor-not-allowed"
                  >
                    {currentStatus === "published"
                      ? "Unpublish"
                      : "Publish now"}
                  </button>
                </div>
              )}
            </div>

            {isFetching && <EditFormSkeleton />}

            {!isFetching && (
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-1.5">
                  <label
                    htmlFor="title"
                    className="text-text-body text-sm font-semibold"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Give your post a title..."
                    {...register("title")}
                    className={inputClass(errors.title)}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "18px",
                    }}
                  />
                  <FieldError message={errors.title?.message} />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="category"
                    className="text-text-body text-sm font-semibold"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    {...register("category")}
                    className={inputClass(errors.category)}
                  >
                    <option value="">Select a category</option>
                    <option value="Essays">Essays</option>
                    <option value="Technology">Technology</option>
                    <option value="Travel">Travel</option>
                    <option value="Craft">Craft</option>
                    <option value="Design">Design</option>
                  </select>
                  <FieldError message={errors.category?.message} />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="body"
                      className="text-text-body text-sm font-semibold"
                    >
                      Body
                    </label>
                    {wordCount > 0 && (
                      <span className="text-[12px] text-text-muted">
                        {wordCount} words
                      </span>
                    )}
                  </div>
                  <textarea
                    id="body"
                    rows={16}
                    placeholder="Start writing..."
                    {...register("body")}
                    className={`${inputClass(errors.body)} resize-none leading-relaxed`}
                  />
                  <FieldError message={errors.body?.message} />
                </div>

                <div
                  className="flex items-center justify-end gap-3 pt-4
                  border-t border-border"
                >
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="text-sm text-text-muted hover:text-text-primary
                      transition-colors duration-150"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isUpdating || !isDirty}
                    className="text-sm font-medium bg-accent text-white px-5
                      py-2.5 rounded-lg hover:bg-accent/90 transition-all
                      duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default EditPostPage;
