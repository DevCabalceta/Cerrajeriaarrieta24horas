import { useEffect, useState, type RefObject } from 'react';

export type RevealState = 'static' | 'hidden' | 'revealed';

/**
 * Entrance state for island content. Server HTML stays visible ('static'); after hydration,
 * elements below the fold are hidden and revealed once, the first time they enter the viewport.
 */
export function useRevealOnce(ref: RefObject<Element | null>, rootMargin = '0px 0px -10% 0px'): RevealState {
  const [state, setState] = useState<RevealState>('static');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (element.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setState('hidden');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setState('revealed');
        observer.disconnect();
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return state;
}
