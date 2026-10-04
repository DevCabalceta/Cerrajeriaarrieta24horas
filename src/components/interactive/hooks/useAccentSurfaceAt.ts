import { useEffect, useState } from 'react';

/**
 * True while an element marked `data-surface="accent"` sits behind a band of `bandSize` pixels
 * at the top or bottom edge of the viewport, e.g. behind the header or the floating dock.
 */
export function useAccentSurfaceAt(edge: 'top' | 'bottom', bandSize: number): boolean {
  const [over, setOver] = useState(false);

  useEffect(() => {
    const surfaces = document.querySelectorAll('[data-surface="accent"]');
    if (surfaces.length === 0) return;

    const intersecting = new Set<Element>();
    let observer: IntersectionObserver | undefined;

    const connect = () => {
      observer?.disconnect();
      intersecting.clear();

      const inset = Math.max(window.innerHeight - bandSize, 0);
      const rootMargin = edge === 'top' ? `0px 0px -${inset}px 0px` : `-${inset}px 0px 0px 0px`;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) intersecting.add(entry.target);
            else intersecting.delete(entry.target);
          }
          setOver(intersecting.size > 0);
        },
        { rootMargin },
      );
      for (const surface of surfaces) observer.observe(surface);
    };

    connect();
    window.addEventListener('resize', connect);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', connect);
    };
  }, [edge, bandSize]);

  return over;
}
