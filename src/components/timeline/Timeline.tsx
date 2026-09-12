"use client";

import { TimelineItem } from "@/components/timeline/TimelineItem";
import { useWatchProgressContext } from "@/components/watch/WatchProgressProvider";
import type { Franchise, LoreCap } from "@/types";

interface TimelineProps {
  franchise: Franchise;
  loreCaps: Record<string, LoreCap>;
}

export function Timeline({ franchise, loreCaps }: TimelineProps) {
  const { watchedIds, toggle } = useWatchProgressContext();

  const titles = [...franchise.titles].sort(
    (a, b) => a.chronologicalOrder - b.chronologicalOrder,
  );

  return (
    <ol>
      {titles.map((title, index) => (
        <TimelineItem
          key={title.id}
          title={title}
          watched={watchedIds.has(title.id)}
          isLast={index === titles.length - 1}
          country={franchise.country}
          loreCap={loreCaps[title.id]}
          onToggleWatched={toggle}
        />
      ))}
    </ol>
  );
}
