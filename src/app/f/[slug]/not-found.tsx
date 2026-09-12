import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";

export default function FranchiseNotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader />
      <main className="text-cinema-muted mx-auto flex max-w-md flex-1 flex-col items-center justify-center gap-4 px-6 text-center text-sm">
        <p>No encontramos esa franquicia.</p>
        <Link href="/" className="text-cinema-accent hover:underline">
          Volver al buscador
        </Link>
      </main>
    </div>
  );
}
