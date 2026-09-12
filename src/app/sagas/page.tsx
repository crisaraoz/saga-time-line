import { listCuratedFranchises } from "@/data/curated-franchises";
import { AppHeader } from "@/components/layout/AppHeader";
import { SagasCatalog } from "@/components/sagas/SagasCatalog";

export const metadata = {
  title: "Sagas famosas · SagaFlow",
  description:
    "Listado de franquicias curadas en orden cronológico de la historia.",
};

export default function SagasPage() {
  const franchises = listCuratedFranchises().map((franchise) => ({
    slug: franchise.slug,
    name: franchise.name,
    tagline: franchise.tagline,
    category: franchise.category!,
  }));

  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <AppHeader />

      <main className="mx-auto w-full max-w-md flex-1 px-4 pb-16 pt-6 md:max-w-2xl lg:max-w-3xl lg:px-8">
        <p className="text-cinema-accent text-[11px] font-semibold uppercase tracking-widest">
          Catálogo curado
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight lg:text-3xl">
          Sagas famosas
        </h1>
        <p className="text-cinema-muted mt-2 text-sm leading-relaxed">
          Rutas armadas a mano: colecciones unidas y ordenadas para seguir el
          hilo de la historia.
        </p>

        <SagasCatalog items={franchises} />
      </main>
    </div>
  );
}
