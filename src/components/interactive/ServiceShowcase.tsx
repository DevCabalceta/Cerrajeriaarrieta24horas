import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m, type Transition } from 'motion/react';
import { cn } from '@/utils/cn';
import { TextLink } from '@/components/ui/TextLink';
import { useMediaQuery } from './hooks/useMediaQuery';
import { useRevealOnce } from './hooks/useRevealOnce';

export interface ShowcaseImage {
  src: string;
  srcSet: string;
  alt: string;
}

export interface ShowcaseItem {
  id: string;
  label: string;
  title: string;
  description: string;
  services: readonly string[];
  whatsappUrl: string;
  detailLink?: { href: string; label: string };
  image: ShowcaseImage;
}

type FrameStatus = 'active' | 'previous' | 'hidden';

const ease = [0.22, 1, 0.36, 1] as const;
const instant: Transition = { duration: 0 };
const IMAGE_SIZES = '(min-width: 1024px) 40vw, 100vw';

const pad = (value: number) => String(value).padStart(2, '0');

function ShowcaseFrame({ image, status, animate }: { image: ShowcaseImage; status: FrameStatus; animate: boolean }) {
  const reveal = status === 'active' && animate;
  return (
    <m.div
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: status === 'active' ? 2 : status === 'previous' ? 1 : 0 }}
      initial={false}
      animate={{ clipPath: status === 'hidden' ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 0% 0%)' }}
      transition={reveal ? { duration: 0.9, ease } : instant}
    >
      <m.img
        src={image.src}
        srcSet={image.srcSet}
        sizes={IMAGE_SIZES}
        alt=""
        loading="lazy"
        decoding="async"
        className="size-full object-cover brightness-90 grayscale"
        initial={false}
        animate={{ scale: status === 'active' ? 1 : 1.12 }}
        transition={reveal ? { duration: 1.3, ease } : instant}
      />
    </m.div>
  );
}

interface ServiceArticleProps {
  item: ShowcaseItem;
  index: number;
  /** Desktop only: the article currently shown in the sticky media panel. */
  active: boolean;
  /** Desktop only: another article is active. */
  dimmed: boolean;
  onActivate: (index: number) => void;
  registerRef: (index: number, element: HTMLElement | null) => void;
}

function ServiceArticle({ item, index, active, dimmed, onActivate, registerRef }: ServiceArticleProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const reveal = useRevealOnce(contentRef);
  const hidden = reveal === 'hidden';
  const enter: Transition = hidden ? instant : { duration: 0.9, ease };

  return (
    <article
      ref={(element) => registerRef(index, element)}
      data-index={index}
      aria-labelledby={`servicio-${item.id}`}
      onPointerEnter={(event) => event.pointerType === 'mouse' && onActivate(index)}
      onFocus={() => onActivate(index)}
      className="relative py-10 sm:py-12 lg:py-14"
    >
      <m.span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left bg-line"
        initial={false}
        animate={{ scaleX: hidden ? 0 : 1 }}
        transition={enter}
      />
      <m.span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left bg-accent"
        initial={false}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.8, ease }}
      />

      <m.div
        ref={contentRef}
        className="grid grid-cols-[2.25rem_1fr] gap-x-4 sm:grid-cols-[3.5rem_1fr]"
        initial={false}
        animate={{ opacity: hidden ? 0 : 1, y: hidden ? 28 : 0 }}
        transition={enter}
      >
        <span
          className={cn(
            'pt-1 font-mono text-label tabular-nums transition-colors duration-500',
            active ? 'text-accent' : 'text-fg-subtle',
          )}
        >
          {pad(index + 1)}
        </span>

        <div>
          <div className="mb-8 aspect-[4/3] overflow-hidden bg-surface lg:hidden">
            <img
              src={item.image.src}
              srcSet={item.image.srcSet}
              sizes={IMAGE_SIZES}
              alt={item.image.alt}
              loading="lazy"
              decoding="async"
              className="size-full object-cover brightness-90 grayscale"
            />
          </div>

          <p className="font-mono text-label text-fg-subtle uppercase">{item.label}</p>
          <h3
            id={`servicio-${item.id}`}
            className={cn(
              'mt-3 text-title font-medium text-balance transition-colors duration-500',
              dimmed ? 'text-fg-muted' : 'text-fg',
            )}
          >
            {item.title}
          </h3>
          <p className="mt-4 max-w-[34rem] text-[16px] leading-relaxed text-pretty text-fg-muted sm:text-[17px]">
            {item.description}
          </p>

          <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {item.services.map((service) => (
              <li key={service} className="flex gap-3 text-[15px] leading-snug text-fg/90">
                <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-accent/70" />
                {service}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            <TextLink href={item.whatsappUrl} external>
              Consultar por WhatsApp
            </TextLink>
            {item.detailLink && <TextLink href={item.detailLink.href}>{item.detailLink.label}</TextLink>}
          </div>
        </div>
      </m.div>
    </article>
  );
}

export default function ServiceShowcase({ items }: { items: readonly ShowcaseItem[] }) {
  const [{ active, previous }, setFrames] = useState({ active: 0, previous: -1 });
  const articles = useRef<(HTMLElement | null)[]>([]);
  const isDesktop = useMediaQuery('(min-width: 64rem)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const activate = useCallback((index: number) => {
    setFrames((current) => (current.active === index ? current : { active: index, previous: current.active }));
  }, []);

  const registerRef = useCallback((index: number, element: HTMLElement | null) => {
    articles.current[index] = element;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activate(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const article of articles.current) if (article) observer.observe(article);
    return () => observer.disconnect();
  }, [activate]);

  const activeItem = items[active];

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div aria-hidden="true" className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--spacing-header)+2.5rem)] pt-10">
              <div className="relative aspect-[4/5] max-h-[calc(100svh-var(--spacing-header)-8rem)] w-full overflow-hidden bg-surface">
                {items.map((item, index) => (
                  <ShowcaseFrame
                    key={item.id}
                    image={item.image}
                    status={index === active ? 'active' : index === previous ? 'previous' : 'hidden'}
                    animate={!prefersReducedMotion}
                  />
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between font-mono text-label text-fg-subtle uppercase">
                <span className="relative h-4 flex-1 overflow-hidden">
                  <AnimatePresence initial={false}>
                    <m.span
                      key={activeItem?.id}
                      className="absolute inset-0"
                      initial={{ y: '100%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '-100%' }}
                      transition={{ duration: 0.5, ease }}
                    >
                      {activeItem?.label}
                    </m.span>
                  </AnimatePresence>
                </span>
                <span className="tabular-nums">
                  {pad(active + 1)} / {pad(items.length)}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {items.map((item, index) => (
              <ServiceArticle
                key={item.id}
                item={item}
                index={index}
                active={isDesktop && index === active}
                dimmed={isDesktop && index !== active}
                onActivate={activate}
                registerRef={registerRef}
              />
            ))}
            <span aria-hidden="true" className="block h-px bg-line" />
          </div>
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}
