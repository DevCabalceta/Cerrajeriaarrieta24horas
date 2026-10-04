import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { ArrowSwap } from './ArrowSwap';
import { PhoneIcon, WhatsAppIcon } from './icons';
import { RollingText } from './RollingText';

const icons = {
  whatsapp: WhatsAppIcon,
  phone: PhoneIcon,
} as const;

interface CtaLinkProps {
  href: string;
  children: ReactNode;
  /** `inverse` is the primary button for use on accent-colored surfaces. */
  variant?: 'primary' | 'secondary' | 'inverse';
  icon?: keyof typeof icons;
  /** Secondary detail shown at the trailing edge, e.g. a phone number. */
  detail?: string;
  external?: boolean;
  ariaLabel?: string;
  className?: string;
}

const variants = {
  primary:
    'bg-accent pr-2 pl-6 font-semibold text-accent-fg hover:bg-accent-strong',
  secondary:
    'border border-line-strong px-6 font-medium text-fg hover:border-white/25 hover:bg-white/[0.04]',
  inverse: 'bg-accent-fg pr-2 pl-6 font-semibold text-accent hover:bg-elevated',
} as const;

const arrowColors = {
  primary: 'bg-accent-fg text-accent',
  inverse: 'bg-accent text-accent-fg',
} as const;

export function CtaLink({
  href,
  children,
  variant = 'primary',
  icon,
  detail,
  external = false,
  ariaLabel,
  className,
}: CtaLinkProps) {
  const Icon = icon ? icons[icon] : null;

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      className={cn(
        'group flex h-14 items-center gap-3 rounded-full text-[15px] whitespace-nowrap transition-[background-color,border-color,scale] duration-200 ease-smooth active:scale-[0.98]',
        'max-[359px]:gap-2.5 max-[359px]:px-5 max-[359px]:text-[14px]',
        variants[variant],
        className,
      )}
    >
      {Icon && (
        <Icon
          className={cn(
            'shrink-0',
            icon === 'phone' ? 'size-[18px] origin-[50%_60%] group-hover:animate-ring' : 'size-5',
          )}
        />
      )}
      <RollingText>{children}</RollingText>
      {external && <span className="sr-only">(se abre en una pestaña nueva)</span>}
      {detail && (
        <span className="ml-auto pl-3 font-mono text-[13px] tabular-nums text-fg-muted max-[359px]:hidden">{detail}</span>
      )}
      {variant !== 'secondary' && <ArrowSwap className={cn('ml-auto size-10 max-[359px]:hidden', arrowColors[variant])} />}
    </a>
  );
}
