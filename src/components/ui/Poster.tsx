import Image from "next/image";
import { posterUrl, type PosterSize } from "@/lib/tmdb/images";
import { cn } from "@/lib/utils/cn";

interface PosterProps {
  path: string | null;
  alt: string;
  /** Tamaño pedido a TMDB; el tamaño en pantalla se define con className. */
  size?: PosterSize;
  /** Debe incluir el ancho (ej. "w-11 lg:w-16"); la altura sale del ratio 2:3. */
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function Poster({
  path,
  alt,
  size = "w185",
  className,
  sizes,
  priority = false,
}: PosterProps) {
  const src = posterUrl(path, size);

  return (
    <div
      className={cn(
        "bg-cinema-elevated relative aspect-[2/3] shrink-0 overflow-hidden rounded-lg",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div className="text-cinema-muted flex size-full items-center justify-center text-[9px]">
          Sin póster
        </div>
      )}
    </div>
  );
}
