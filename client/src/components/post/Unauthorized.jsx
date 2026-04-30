export const Unauthorized = ({ navigate }) => (
  <div
    className="min-h-[60vh] flex flex-col items-center justify-center
    text-center px-6"
  >
    <p
      className="text-4xl font-bold text-text-primary mb-3"
      style={{ fontFamily: "var(--font-display)" }}
    >
      Not your post
    </p>
    <p className="text-sm text-text-muted mb-8 max-w-xs">
      You can only edit posts that belong to your account.
    </p>
    <button
      onClick={() => navigate("/")}
      className="text-sm font-medium border border-ink text-text-primary px-5
        py-2.5 rounded-lg hover:bg-ink hover:text-white transition-all duration-200"
    >
      Back to home
    </button>
  </div>
);
