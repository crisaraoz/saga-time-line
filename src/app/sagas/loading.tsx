import { AppHeader } from "@/components/layout/AppHeader";
import { Skeleton } from "@/components/ui/Skeleton";

export default function SagasLoading() {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <AppHeader />
      <main className="mx-auto w-full max-w-md flex-1 px-4 pb-16 pt-6 md:max-w-2xl lg:max-w-5xl lg:px-8 lg:pt-8">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="mt-3 h-8 w-48" />
        <Skeleton className="mt-3 h-4 w-72 max-w-full" />
        <div className="mt-6 flex justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-8 w-28 rounded-lg" />
        </div>
        <ul className="mt-4 grid grid-cols-1 gap-2 lg:grid-cols-2">
          {Array.from({ length: 8 }, (_, index) => (
            <li
              key={index}
              className="border-cinema-border bg-cinema-surface flex items-center gap-3 rounded-2xl border p-3"
            >
              <Skeleton className="aspect-[2/3] w-14 shrink-0 rounded-lg" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-40 max-w-full" />
                <Skeleton className="h-3 w-56 max-w-full" />
                <Skeleton className="h-4 w-16 rounded-full" />
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
