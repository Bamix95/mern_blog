import { Skeleton } from "../skeletons/Skeleton";

export const PostPageSkeleton = () => (
  <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-0 py-10">
    <Skeleton className="h-4 w-24 mb-10" />

    <Skeleton className="h-3 w-20 mb-4 rounded-sm" />
    <Skeleton className="h-10 w-full mb-3" />
    <Skeleton className="h-10 w-4/5 mb-8" />

    <div className="flex items-center gap-3 py-5 border-y border-border mb-10">
      <Skeleton className="w-9 h-9 rounded-full shrink-0" />
      <div className="space-y-1.5 flex-1">
        <Skeleton className="h-3.5 w-32" />
        <Skeleton className="h-3 w-44" />
      </div>
    </div>

    {Array.from({ length: 6 }).map((_, i) => (
      <Skeleton
        key={i}
        className={`h-4 mb-3 ${i % 4 === 3 ? "w-2/3" : "w-full"}`}
      />
    ))}
    <Skeleton className="h-4 w-full mt-8 mb-3" />
    {Array.from({ length: 4 }).map((_, i) => (
      <Skeleton
        key={i}
        className={`h-4 mb-3 ${i % 3 === 2 ? "w-3/4" : "w-full"}`}
      />
    ))}
  </div>
);

export const EditFormSkeleton = () => (
  <div className="space-y-6">
    <div className="space-y-2">
      <Skeleton className="h-3 w-10" />
      <Skeleton className="h-11 w-full" />
    </div>

    <div className="space-y-2">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-11 w-full" />
    </div>

    <div className="space-y-2">
      <Skeleton className="h-3 w-8" />
      <Skeleton className="h-64 w-full" />
    </div>

    <div className="flex justify-end gap-3 pt-4 border-t border-border">
      <Skeleton className="h-10 w-20 rounded-lg" />
      <Skeleton className="h-10 w-28 rounded-lg" />
    </div>
  </div>
);
