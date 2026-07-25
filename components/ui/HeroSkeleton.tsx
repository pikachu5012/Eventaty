import { Skeleton } from "./skeleton";

export function HeroSkeleton() {
  return (
    <div className="relative w-full pt-2 pb-4 overflow-hidden">
      <div className="relative h-[65vh] md:h-[80vh] min-h-[440px] md:min-h-[540px] max-h-[750px] w-full rounded-[28px] overflow-hidden bg-zinc-900 border border-zinc-800 flex items-center pt-24 pb-14 px-6 md:p-16 lg:p-20 max-w-[1400px] mx-auto">
        <Skeleton className="absolute inset-0 rounded-none bg-zinc-800/60" />
        <div className="relative z-10 w-full max-w-[680px] flex flex-col justify-center my-auto">
          <Skeleton className="h-10 md:h-14 w-4/5 mb-4 bg-zinc-700/50" />
          <Skeleton className="h-10 md:h-14 w-2/3 mb-6 bg-zinc-700/50" />
          <Skeleton className="h-5 w-1/2 mb-2 bg-zinc-700/40" />
          <Skeleton className="h-5 w-1/3 mb-8 bg-zinc-700/40" />
          <div className="flex items-center gap-6">
            <Skeleton className="h-12 w-36 rounded-xl bg-violet-600/40" />
            <Skeleton className="h-6 w-24 bg-zinc-700/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
