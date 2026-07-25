import { Skeleton } from "./skeleton";

export function CardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-card border border-gray-200/60 dark:border-slate-800 shadow-xs h-full flex flex-col">
      {/* Header Image Placeholder */}
      <Skeleton className="h-48 w-full rounded-none" />

      {/* Content Placeholders */}
      <div className="grow p-6 pb-4 flex flex-col justify-between">
        <div>
          {/* Title Placeholder (2 lines) */}
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-4" />

          {/* Date & Location Placeholders */}
          <div className="flex items-center gap-3 mb-2.5">
            <Skeleton className="h-4 w-4 rounded-full shrink-0" />
            <Skeleton className="h-4 w-3/5" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-4 rounded-full shrink-0" />
            <Skeleton className="h-4 w-2/5" />
          </div>
        </div>
      </div>

      {/* Footer Placeholder */}
      <div className="px-6 pb-6 pt-0 flex justify-between items-center mt-auto">
        <div className="space-y-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-10 w-28 rounded-xl" />
      </div>
    </div>
  );
}

export function CardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}
