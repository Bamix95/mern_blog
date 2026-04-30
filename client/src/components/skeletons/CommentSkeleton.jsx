import { Skeleton } from "./Skeleton";

export const CommentSkeleton = () => (
  <div className="py-5 border-b border-border last:border-none">
    <div className="flex items-start gap-3">
      <Skeleton className="w-8 h-8 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-28" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  </div>
);
