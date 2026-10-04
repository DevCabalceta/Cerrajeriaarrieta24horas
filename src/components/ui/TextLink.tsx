import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { ArrowRightIcon } from './icons';

interface TextLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}

/** Inline link whose underline is redrawn in the accent color on hover or focus. */
export function TextLink({ href, children, external = false, className }: TextLinkProps) {
  return (
    <a
      href={href}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      className={cn('group inline-flex items-center gap-3 text-[15px] font-medium text-fg', className)}
    >
      <span className="relative pb-1">
        {children}
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-line-strong" />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-accent transition-transform duration-500 ease-smooth group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100"
        />
      </span>
      {external && <span className="sr-only">(se abre en una pestaña nueva)</span>}
      <ArrowRightIcon className="size-4 text-fg-muted transition-[translate,color] duration-300 ease-smooth group-hover:translate-x-1 group-hover:text-accent group-focus-visible:translate-x-1 group-focus-visible:text-accent" />
    </a>
  );
}
