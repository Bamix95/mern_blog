import { Skeleton } from "./Skeleton";

export const HeroSkeleton = () => (
  <div className="border-b border-border px-6 py-12 md:px-12 lg:px-20 max-w-4xl">
    {/* Featured pill */}
    <Skeleton className="h-5 w-20 mb-4 rounded-sm" />
    {/* Eyebrow */}
    <Skeleton className="h-3 w-28 mb-5" />
    {/* Title lines */}
    <Skeleton className="h-10 w-full mb-3" />
    <Skeleton className="h-10 w-4/5 mb-5" />
    {/* Excerpt */}
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-3/4 mb-7" />
    {/* Author row */}
    <div className="flex items-center gap-3">
      <Skeleton className="h-9 w-9 rounded-full" />
      <Skeleton className="h-4 w-48" />
    </div>
  </div>
);
