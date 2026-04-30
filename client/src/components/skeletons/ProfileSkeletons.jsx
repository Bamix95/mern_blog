import { Skeleton } from "../skeletons/Skeleton";

export const ProfileHeaderSkeleton = () => (
  <div className="pb-8 border-b border-border mb-8">
    <div className="flex items-center gap-5">
      <Skeleton className="w-16 h-16 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-56" />
      </div>
    </div>
  </div>
);

export const StatsSkeleton = () => (
  <div className="grid grid-cols-3 gap-4 mb-8">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="bg-surface rounded-lg p-4 text-center space-y-2">
        <Skeleton className="h-8 w-12 mx-auto" />
        <Skeleton className="h-3 w-16 mx-auto" />
      </div>
    ))}
  </div>
);

export const PostRowSkeleton = () => (
  <div className="py-5 border-b border-border">
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-16 rounded-sm" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-28" />
      </div>
      <Skeleton className="h-8 w-16 rounded-lg shrink-0" />
    </div>
  </div>
);
