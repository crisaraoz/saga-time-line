import { AppHeader } from "@/components/layout/AppHeader";
import { SagasCatalog } from "@/components/sagas/SagasCatalog";
import { getCuratedCatalog } from "@/lib/services/catalog";

export const metadata = {
  title: "Sagas famosas · SagaFlow",
  description:
    "Listado de franquicias curadas en orden cronológico de la historia.",
};

export default async function SagasPage() {
  const { value: items } = await getCuratedCatalog();

  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <AppHeader />

      <main className="mx-auto w-full max-w-md flex-1 px-4 pb-16 pt-6 md:max-w-2xl lg:max-w-5xl lg:px-8 lg:pt-8">
        <p className="text-cinema-accent text-[11px] font-semibold tracking-widest uppercase">
          Catálogo curado
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight lg:text-3xl">
          Sagas famosas
        </h1>
        <p className="text-cinema-muted mt-2 max-w-xl text-sm leading-relaxed">
          Colecciones unidas y ordenadas para seguir el hilo de la historia.
        </p>

        <SagasCatalog items={items} />
      </main>
    </div>
  );
}
