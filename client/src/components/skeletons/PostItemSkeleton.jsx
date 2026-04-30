import { Skeleton } from "./Skeleton";

export const PostItemSkeleton = () => (
  <div className="py-6 border-b border-border">
    <Skeleton className="h-3 w-20 mb-3 rounded-sm" />
    <Skeleton className="h-5 w-3/4 mb-2" />
    <Skeleton className="h-4 w-full mb-1" />
    <Skeleton className="h-4 w-2/3 mb-4" />
    <div className="flex gap-3">
      <Skeleton className="h-3 w-14" />
      <Skeleton className="h-3 w-2" />
      <Skeleton className="h-3 w-12" />
    </div>
  </div>
);
