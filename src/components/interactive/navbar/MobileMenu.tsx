import type { MouseEvent } from 'react';
import { m, type Variants } from 'motion/react';
import type { NavItem } from '@/data/navigation';
import { contact, coverage } from '@/data/site';
import { getEmailUrl, getPhoneUrl, getWhatsAppUrl } from '@/utils/contact';
import { cn } from '@/utils/cn';
import { ArrowSwap } from '@/components/ui/ArrowSwap';
import { ArrowUpRightIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/icons';
import { AvailabilityBadge } from './AvailabilityBadge';

interface MobileMenuProps {
  id: string;
  items: readonly NavItem[];
  activeId: string | null;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, href: NavItem['href']) => void;
}

const ease = [0.22, 1, 0.36, 1] as const;
const ITEM_STAGGER = 0.055;
const ITEMS_DELAY = 0.12;

const textReveal: Variants = {
  hidden: { y: '110%' },
  visible: (index: number) => ({
    y: '0%',
    transition: { duration: 0.6, ease, delay: ITEMS_DELAY + index * ITEM_STAGGER },
  }),
};

const lineDraw: Variants = {
  hidden: { scaleX: 0 },
  visible: (index: number) => ({
    scaleX: 1,
    transition: { duration: 0.8, ease, delay: ITEMS_DELAY + index * ITEM_STAGGER },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease, delay },
  }),
};

export function MobileMenu({ id, items, activeId, onNavigate }: MobileMenuProps) {
  const footerDelay = ITEMS_DELAY + items.length * ITEM_STAGGER;

  return (
    <m.div
      id={id}
      className="fixed inset-0 h-dvh overflow-y-auto overscroll-contain bg-canvas pt-header lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } }}
      exit={{ opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
    >
      <m.div
        className="container-page flex min-h-full flex-col pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
        initial="hidden"
        animate="visible"
      >
        <m.div variants={fadeUp} custom={0.05} className="flex items-center justify-between pb-4">
          <span className="font-mono text-label uppercase text-fg-subtle">Navegación</span>
          <AvailabilityBadge className="flex" />
        </m.div>

        <nav aria-label="Menú móvil">
          <ol>
            {items.map((item, index) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id} className="relative">
                  <m.span
                    aria-hidden="true"
                    variants={lineDraw}
                    custom={index}
                    className="absolute inset-x-0 top-0 h-px origin-left bg-line"
                  />
                  <a
                    href={item.href}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={(event) => onNavigate(event, item.href)}
                    className="group flex items-center gap-4 py-4 sm:py-5"
                  >
                    <span
                      className={cn(
                        'w-7 font-mono text-label tabular-nums transition-colors duration-200',
                        isActive ? 'text-accent' : 'text-fg-subtle',
                      )}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 overflow-hidden pb-1 transition-[translate] duration-300 ease-smooth group-hover:translate-x-1.5">
                      <m.span
                        variants={textReveal}
                        custom={index}
                        className="block text-[clamp(1.75rem,8.5vw,3.25rem)] leading-none font-medium tracking-[-0.045em] text-fg transition-colors duration-200 group-active:text-accent"
                      >
                        {item.label}
                      </m.span>
                    </span>
                    <ArrowUpRightIcon className="ml-auto size-5 text-fg-subtle transition-[translate,color] duration-300 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <m.div variants={fadeUp} custom={footerDelay} className="mt-auto pt-12">
          <p className="mb-4 max-w-[22ch] text-[15px] leading-snug text-fg-muted">
            ¿Una emergencia? Escríbanos o llámenos, respondemos a cualquier hora.
          </p>

          <div className="grid gap-2.5 sm:grid-cols-2">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-14 items-center gap-3 rounded-full bg-accent pr-2 pl-6 text-[15px] font-semibold text-accent-fg transition-[scale] duration-200 ease-smooth active:scale-[0.98]"
            >
              <WhatsAppIcon className="size-5" />
              Escribir por WhatsApp
              <span className="sr-only">(se abre en una pestaña nueva)</span>
              <ArrowSwap className="ml-auto size-10 bg-accent-fg text-accent" />
            </a>
            <a
              href={getPhoneUrl()}
              className="group flex h-14 items-center gap-3 rounded-full border border-line-strong px-6 text-[15px] font-medium text-fg transition-[background-color,scale] duration-200 ease-smooth hover:bg-white/[0.04] active:scale-[0.98]"
            >
              <PhoneIcon className="size-[18px] origin-[50%_60%] group-hover:animate-ring" />
              Llamar
              <span className="ml-auto font-mono text-[13px] tabular-nums text-fg-muted">
                {contact.phone.display}
              </span>
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-1.5 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={getEmailUrl()}
              className="text-[13px] text-fg-muted wrap-anywhere transition-colors duration-150 hover:text-fg"
            >
              {contact.email}
            </a>
            <p className="font-mono text-label uppercase text-fg-subtle">
              {coverage.primary.join(' · ')} · GAM
            </p>
          </div>
        </m.div>
      </m.div>
    </m.div>
  );
}
