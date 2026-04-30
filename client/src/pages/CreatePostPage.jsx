import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema } from "../validators/post.validator";
import { useNavigate } from "react-router-dom";
import usePosts from "../hooks/usePosts";

const FieldError = ({ message }) =>
  message ? <p className="text-[12px] text-accent mt-1.5">{message}</p> : null;

const inputClass = (hasError) =>
  `w-full border px-3 py-2.5 text-sm outline-none rounded-lg transition-all duration-150 ease-linear
  focus:ring-1 focus:ring-accent bg-card text-text-primary placeholder:text-text-muted
  ${hasError ? "border-accent" : "border-border"}`;

const CreatePostPage = () => {
  const navigate = useNavigate();
  const { handleCreatePost, isCreating } = usePosts();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createPostSchema),
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

  const onSubmit = async (data) => {
    const success = await handleCreatePost(data);
    if (success) {
      navigate(data.status === "published" ? "/home" : "/profile");
    }
  };

  const handleSaveDraft = () => {
    setValue("status", "draft");
    handleSubmit(onSubmit)();
  };

  const handlePublish = () => {
    setValue("status", "published");
    handleSubmit(onSubmit)();
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

        {wordCount > 0 && (
          <p className="text-[13px] text-text-muted hidden sm:block">
            ~{estimatedReadTime} min read &nbsp;·&nbsp; {wordCount} words
          </p>
        )}
      </nav>

      {/* ── Form ── */}
      <main className="max-w-3xl mx-auto px-6 md:px-12 lg:px-0 py-10">
        <h2
          className="text-3xl font-semibold text-text-primary mb-8"
          style={{ fontFamily: "var(--font-display)" }}
        >
          New post
        </h2>

        <form noValidate className="space-y-6">
          {/* Title */}
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
              style={{ fontFamily: "var(--font-display)", fontSize: "18px" }}
            />
            <FieldError message={errors.title?.message} />
          </div>

          {/* Category */}
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

          {/* Body */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="body"
                className="text-text-body text-sm font-semibold"
              >
                Body
              </label>
              {/* Live word count */}
              {wordCount > 0 && (
                <span className="text-[12px] text-text-muted">
                  {wordCount} words
                </span>
              )}
            </div>
            <textarea
              id="body"
              placeholder="Start writing..."
              rows={16}
              {...register("body")}
              className={`${inputClass(errors.body)} resize-none leading-relaxed`}
            />
            <FieldError message={errors.body?.message} />
          </div>

          {/* ── Actions ── */}
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

            {/* Save draft */}
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isCreating}
              className="text-sm font-medium border border-border text-text-primary
                px-5 py-2.5 rounded-lg hover:border-ink transition-all duration-150
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? "Saving..." : "Save draft"}
            </button>

            {/* Publish */}
            <button
              type="button"
              onClick={handlePublish}
              disabled={isCreating}
              className="text-sm font-medium bg-accent text-white px-5 py-2.5
                rounded-lg hover:bg-accent/90 transition-all duration-150
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreatePostPage;
