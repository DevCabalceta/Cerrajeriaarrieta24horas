const REVEALED_CLASS = 'is-revealed';

/** Adds `is-revealed` to every `[data-reveal]` element the first time it enters the viewport. */
export function initReveal(root: ParentNode = document): void {
  const elements = root.querySelectorAll<HTMLElement>(`[data-reveal]:not(.${REVEALED_CLASS})`);

  if (!('IntersectionObserver' in window)) {
    for (const element of elements) element.classList.add(REVEALED_CLASS);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add(REVEALED_CLASS);
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );

  for (const element of elements) observer.observe(element);
}
