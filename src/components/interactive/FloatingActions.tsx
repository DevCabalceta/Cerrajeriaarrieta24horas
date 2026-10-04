import { useEffect, useState, type ReactNode } from 'react';
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  type MotionProps,
} from 'motion/react';
import { cn } from '@/utils/cn';
import { ArrowUpIcon, FacebookIcon, WhatsAppIcon } from '@/components/ui/icons';
import { useAccentSurfaceAt } from './hooks/useAccentSurfaceAt';

interface FloatingActionsProps {
  /** Contact buttons appear once this element (the hero CTAs) has been scrolled past. */
  contactTriggerId: string;
  /** The back-to-top button appears once this element (the hero) has been scrolled past. */
  topTriggerId: string;
  /** Element that receives focus after returning to the top. */
  focusId?: string;
  whatsappUrl: string;
  facebookUrl: string;
}

const entrance: MotionProps = {
  initial: { opacity: 0, scale: 0.8, y: 16 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.8, y: 16 },
  whileTap: { scale: 0.92 },
  transition: { type: 'spring', stiffness: 420, damping: 30 },
};

const secondaryButton =
  'group relative grid size-12 place-items-center rounded-full bg-surface/85 text-fg backdrop-blur-md transition-colors duration-200 hover:bg-elevated';

const contactButton =
  'group relative grid size-14 place-items-center rounded-full shadow-[0_8px_24px_-8px] shadow-black/60 transition-colors duration-200';

function useScrolledPast(id: string): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setPast(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [id]);

  return past;
}

/** Desktop-only label that slides out to the left of a floating button. */
function HoverLabel({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-full mr-3 hidden translate-x-2 rounded-full bg-surface/90 px-3 py-1.5 text-[13px] font-medium whitespace-nowrap text-fg opacity-0 backdrop-blur-md transition-[opacity,translate] duration-300 ease-smooth group-hover:translate-x-0 group-hover:opacity-100 [@media(hover:hover)]:block"
    >
      {children}
    </span>
  );
}

export default function FloatingActions({
  contactTriggerId,
  topTriggerId,
  focusId,
  whatsappUrl,
  facebookUrl,
}: FloatingActionsProps) {
  const showContact = useScrolledPast(contactTriggerId);
  const showTop = useScrolledPast(topTriggerId);
  const overAccent = useAccentSurfaceAt('bottom', 96);
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  function scrollToTop() {
    // Focus first: focusing after starting a smooth scroll cancels it in Chromium.
    if (focusId) document.getElementById(focusId)?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <div className="pointer-events-none fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex flex-col items-center gap-3 sm:right-6 sm:bottom-6 [&>*]:pointer-events-auto">
          <AnimatePresence>
            {showTop && (
              <m.button key="top" type="button" aria-label="Volver arriba" onClick={scrollToTop} className={secondaryButton} {...entrance}>
                <svg aria-hidden="true" viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90">
                  <circle cx="24" cy="24" r="23" fill="none" strokeWidth="1.5" className="stroke-line-strong" />
                  <m.circle
                    cx="24"
                    cy="24"
                    r="23"
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="stroke-accent"
                    style={{ pathLength: scrollYProgress }}
                  />
                </svg>
                <span aria-hidden="true" className="relative grid size-4 overflow-hidden">
                  <ArrowUpIcon className="size-4 transition-transform duration-300 ease-smooth group-hover:-translate-y-full group-focus-visible:-translate-y-full" />
                  <ArrowUpIcon className="absolute inset-0 size-4 translate-y-full transition-transform duration-300 ease-smooth group-hover:translate-y-0 group-focus-visible:translate-y-0" />
                </span>
              </m.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showContact && (
              <m.a
                key="facebook"
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Cerrajería Arrieta (se abre en una pestaña nueva)"
                className={cn(contactButton, 'bg-facebook text-white hover:bg-facebook-strong')}
                {...entrance}
              >
                <HoverLabel>Síganos en Facebook</HoverLabel>
                <FacebookIcon className="size-6 transition-transform duration-300 ease-snappy group-hover:scale-110 group-hover:-rotate-6" />
              </m.a>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showContact && (
              <m.a
                key="whatsapp"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escribir por WhatsApp (se abre en una pestaña nueva)"
                className={cn(
                  contactButton,
                  overAccent ? 'bg-accent-fg text-accent hover:bg-elevated' : 'bg-accent text-accent-fg hover:bg-accent-strong',
                )}
                {...entrance}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 animate-[beacon_2.4s_var(--ease-smooth)_0.4s_2] rounded-full bg-accent"
                />
                <HoverLabel>Escríbanos por WhatsApp</HoverLabel>
                <WhatsAppIcon className="relative size-6 transition-transform duration-300 ease-snappy group-hover:scale-110 group-hover:-rotate-6" />
              </m.a>
            )}
          </AnimatePresence>
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}
