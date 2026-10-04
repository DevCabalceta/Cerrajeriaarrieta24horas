import { useEffect, useState } from 'react';

/** Returns the id of the section crossing the middle band of the viewport, if any. */
export function useActiveSection(ids: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const idsKey = ids.join(',');

  useEffect(() => {
    const sectionIds = idsKey.split(',');
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActiveId(sectionIds.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: '-45% 0px -54% 0px' },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [idsKey]);

  return activeId;
}
