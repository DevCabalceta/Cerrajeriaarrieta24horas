import type { ReactNode } from 'react';

/** Label that rolls up to reveal a copy of itself when the parent `group` is hovered or focused. */
export function RollingText({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-flex overflow-hidden">
      <span className="block transition-transform duration-300 ease-smooth group-hover:-translate-y-full group-focus-visible:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-smooth group-hover:translate-y-0 group-focus-visible:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}
