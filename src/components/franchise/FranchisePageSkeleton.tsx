import { Skeleton } from "@/components/ui/Skeleton";

function TimelineCardSkeleton() {
  return (
    <li className="relative pb-3 pl-12 lg:pb-4">
      <span
        aria-hidden
        className="bg-cinema-border absolute bottom-0 left-[19px] top-12 w-0.5"
      />
      <Skeleton className="absolute left-0 top-2 size-10 rounded-full" />
      <div className="bg-cinema-surface border-cinema-border flex items-center gap-3 rounded-2xl border p-3 lg:gap-4 lg:p-4">
        <Skeleton className="aspect-[2/3] w-11 shrink-0 rounded-lg lg:w-16" />
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-4 w-48 max-w-full" />
          <Skeleton className="h-3 w-32 max-w-full" />
        </div>
        <Skeleton className="size-5 shrink-0 rounded-full" />
      </div>
    </li>
  );
}

export function FranchisePageSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <main className="mx-auto w-full max-w-md flex-1 pb-16 md:max-w-2xl lg:max-w-6xl lg:px-8 lg:pt-8">
      <div className="lg:flex lg:items-start lg:gap-10">
        <aside className="lg:sticky lg:top-28 lg:w-[330px] lg:shrink-0">
          <Skeleton className="aspect-[16/9] w-full rounded-none lg:rounded-2xl" />
          <div className="relative -mt-6 space-y-3 px-4 lg:mt-4 lg:px-0">
            <Skeleton className="h-3 w-36" />
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-64 max-w-full" />
            <div className="space-y-2 pt-2">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-10" />
              </div>
              <Skeleton className="h-1.5 w-full rounded-full" />
              <Skeleton className="mt-4 h-9 w-full rounded-full" />
            </div>
          </div>
        </aside>

        <div className="mt-6 min-w-0 flex-1 px-4 lg:mt-0 lg:px-0">
          <ol aria-busy aria-label="Cargando ruta de visualización">
            {Array.from({ length: cards }, (_, index) => (
              <TimelineCardSkeleton key={index} />
            ))}
          </ol>

          <section className="mt-8 lg:mt-10">
            <Skeleton className="mb-3 h-4 w-40" />
            <div className="flex gap-3 overflow-hidden">
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className="w-28 shrink-0 space-y-2 lg:w-36">
                  <Skeleton className="aspect-[2/3] w-full rounded-xl" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-2.5 w-20" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
