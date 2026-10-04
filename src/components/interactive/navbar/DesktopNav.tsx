import { useLayoutEffect, useRef, useState } from 'react';
import { m, type Transition } from 'motion/react';
import type { NavItem } from '@/data/navigation';
import { cn } from '@/utils/cn';

interface DesktopNavProps {
  items: readonly NavItem[];
  activeId: string | null;
}

interface IndicatorState {
  x: number;
  width: number;
  visible: boolean;
  /** Jump to the new position instead of sliding (used when appearing). */
  instant: boolean;
}

const hiddenIndicator: IndicatorState = { x: 0, width: 0, visible: false, instant: true };

const slide: Transition = { type: 'spring', stiffness: 520, damping: 42, mass: 0.6 };
const fade: Transition = { duration: 0.18, ease: 'easeOut' };

function indicatorTransition(instant: boolean): Transition {
  return instant ? { default: { duration: 0 }, opacity: fade } : { default: slide, opacity: fade };
}

export function DesktopNav({ items, activeId }: DesktopNavProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const [hover, setHover] = useState<IndicatorState>(hiddenIndicator);
  const [active, setActive] = useState<IndicatorState>(hiddenIndicator);

  function moveIndicator(id: string | null, previous: IndicatorState): IndicatorState {
    const link = id ? linkRefs.current.get(id) : undefined;
    if (!link) return { ...previous, visible: false };
    return { x: link.offsetLeft, width: link.offsetWidth, visible: true, instant: !previous.visible };
  }

  useLayoutEffect(() => {
    const update = () => setActive((previous) => moveIndicator(activeId, previous));
    update();

    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(update);
    observer.observe(list);
    return () => observer.disconnect();
  }, [activeId]);

  const showHover = (id: string) => setHover((previous) => moveIndicator(id, previous));
  const hideHover = () => setHover((previous) => ({ ...previous, visible: false }));

  return (
    <nav aria-label="Principal" className="ml-8 hidden flex-1 animate-enter-down [animation-delay:120ms] lg:block">
      <ul ref={listRef} className="relative flex items-center" onPointerLeave={hideHover}>
        <m.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 rounded-full bg-white/[0.07]"
          initial={false}
          animate={{ x: hover.x, width: hover.width, opacity: hover.visible ? 1 : 0 }}
          transition={indicatorTransition(hover.instant)}
        />
        <m.span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-1.5 left-0 size-1 rounded-full bg-accent"
          initial={false}
          animate={{ x: active.x + active.width / 2 - 2, opacity: active.visible ? 1 : 0 }}
          transition={indicatorTransition(active.instant)}
        />
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                ref={(node) => {
                  if (node) linkRefs.current.set(item.id, node);
                  else linkRefs.current.delete(item.id);
                }}
                href={item.href}
                aria-current={isActive ? 'location' : undefined}
                onPointerEnter={() => showHover(item.id)}
                onFocus={() => showHover(item.id)}
                onBlur={hideHover}
                className={cn(
                  'relative flex items-center rounded-full px-3.5 py-2 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-150 hover:text-fg focus-visible:text-fg',
                  isActive ? 'text-fg' : 'text-fg-muted',
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
