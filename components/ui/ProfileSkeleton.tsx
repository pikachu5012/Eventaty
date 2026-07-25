import { Skeleton } from "./skeleton";

export function ProfileBookingSkeleton() {
  return (
    <div className="my-5 min-h-[220px] rounded-2xl overflow-hidden bg-card border border-border/40 shadow-md flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col md:flex-row min-w-0">
        {/* Image */}
        <Skeleton className="w-full md:w-52 h-52 md:h-auto rounded-none shrink-0" />
        {/* Content */}
        <div className="flex-1 p-6 md:p-7 flex flex-col justify-between space-y-5">
          <div>
            <Skeleton className="h-7 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-5" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-5 w-20" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-9 w-28 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Dashed divider */}
      <div className="hidden md:block w-px border-r-2 border-dashed border-zinc-300 dark:border-zinc-700 self-stretch my-3" />

      {/* QR Stub */}
      <div className="w-full md:w-32 shrink-0 bg-zinc-100 dark:bg-zinc-900/90 p-5 flex flex-col items-center justify-center">
        <Skeleton className="h-24 w-24 rounded-xl" />
        <Skeleton className="h-3 w-20 mt-2.5" />
      </div>
    </div>
  );
}

export function ProfileBookingListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProfileBookingSkeleton key={index} />
      ))}
    </div>
  );
}

export function UserInfoCardSkeleton() {
  return (
    <div className="w-full rounded-2xl bg-card p-6 shadow-xl border border-zinc-200 dark:border-zinc-800/80 flex flex-col items-center">
      <Skeleton className="w-24 h-24 rounded-full mb-4" />
      <Skeleton className="h-6 w-40 mb-2" />
      <Skeleton className="h-4 w-48 mb-6" />
      <div className="w-full space-y-3 pt-4 border-t border-border/80">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
