export const StatusBadge = ({ status }) => (
  <span
    className={`text-[10px] tracking-[1.5px] uppercase font-medium px-2.5 py-1
      rounded-sm inline-block
      ${
        status === "published"
          ? "bg-tag-bg text-accent"
          : "bg-surface text-text-muted"
      }`}
  >
    {status}
  </span>
);
