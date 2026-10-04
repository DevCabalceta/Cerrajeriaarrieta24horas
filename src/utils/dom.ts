const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => !element.closest('[inert]') && element.getClientRects().length > 0,
  );
}

export function lockScroll(): () => void {
  const root = document.documentElement;
  const previousOverflow = root.style.overflow;
  root.style.overflow = 'hidden';

  return () => {
    root.style.overflow = previousOverflow;
  };
}

/** Makes every element outside `keep` inert, walking up to <body>. */
export function setInertOutside(keep: HTMLElement): () => void {
  const affected: HTMLElement[] = [];
  let current: HTMLElement | null = keep;

  while (current && current !== document.body) {
    const parent: HTMLElement | null = current.parentElement;
    if (!parent) break;

    for (const sibling of Array.from(parent.children)) {
      if (sibling !== current && sibling instanceof HTMLElement && !sibling.inert) {
        sibling.inert = true;
        affected.push(sibling);
      }
    }
    current = parent;
  }

  return () => {
    for (const element of affected) element.inert = false;
  };
}
