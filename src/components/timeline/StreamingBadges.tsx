import Image from "next/image";
import { logoUrl } from "@/lib/tmdb/images";
import type { StreamingProvider } from "@/types";

const MAX_PER_GROUP = 5;

const GROUPS = [
  { label: "Incluido", types: ["flatrate", "free", "ads"] },
  { label: "Alquiler", types: ["rent", "buy"] },
] as const;

function ProviderLogo({ provider }: { provider: StreamingProvider }) {
  const src = logoUrl(provider.logoPath, "w92");

  if (!src) {
    return (
      <li className="bg-cinema-elevated border-cinema-border rounded-lg border px-2 py-1.5 text-[11px] font-medium">
        {provider.name}
      </li>
    );
  }

  return (
    // Fondo claro: varios logos de TMDB son artwork oscuro sobre transparente
    // y desaparecerían sobre el tema oscuro.
    <li
      title={provider.name}
      className="border-cinema-border size-9 overflow-hidden rounded-lg border bg-white"
    >
      <Image
        src={src}
        alt={provider.name}
        width={36}
        height={36}
        className="size-full object-contain"
      />
    </li>
  );
}

export function StreamingBadges({
  providers,
  country,
}: {
  providers: StreamingProvider[];
  country: string;
}) {
  if (providers.length === 0) {
    return (
      <p className="text-cinema-muted text-xs">
        Sin disponibilidad en streaming en {country}.
      </p>
    );
  }

  const groups = GROUPS.map((group) => ({
    label: group.label,
    providers: providers.filter((provider) =>
      (group.types as readonly string[]).includes(provider.type),
    ),
  })).filter((group) => group.providers.length > 0);

  return (
    <div className="space-y-2">
      {groups.map((group) => {
        const visible = group.providers.slice(0, MAX_PER_GROUP);
        const hidden = group.providers.length - visible.length;

        return (
          <div key={group.label} className="flex items-center gap-2">
            <span className="text-cinema-muted w-14 shrink-0 text-[10px] uppercase tracking-wide">
              {group.label}
            </span>
            <ul className="flex flex-wrap items-center gap-1.5">
              {visible.map((provider) => (
                <ProviderLogo
                  key={`${provider.providerId}-${provider.type}`}
                  provider={provider}
                />
              ))}
              {hidden > 0 && (
                <li className="text-cinema-muted text-xs">+{hidden}</li>
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
