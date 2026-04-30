export const RenderBody = ({ body }) => (
  <div className="space-y-6">
    {body.split("\n\n").map((paragraph, i) =>
      paragraph.trim() ? (
        <p key={i} className="text-text-body text-[16px] leading-[1.9]">
          {paragraph.trim()}
        </p>
      ) : null,
    )}
  </div>
);
