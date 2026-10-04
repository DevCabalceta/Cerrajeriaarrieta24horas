import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import { LazyMotion, MotionConfig, animate, domAnimation, m, useMotionValue, useTransform } from 'motion/react';
import { KeyMark } from '@/components/ui/icons';
import { cn } from '@/utils/cn';

interface SlideToContactProps {
  href: string;
  label: string;
}

type SliderStatus = 'idle' | 'dragging' | 'done';

const HANDLE_SIZE = 56;

function PadlockIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path
        d="M8 11V8a4 4 0 0 1 8 0v3"
        className={cn('transition-[translate] delay-150 duration-500 ease-snappy', open && '-translate-y-[3px]')}
      />
    </svg>
  );
}
/** Gap between the handle and the track's inner edge: (64px height − 2px border − 56px handle) / 2. */
const TRACK_PADDING = 3;
/** Fraction of the track that counts as a completed slide. */
const COMPLETE_AT = 0.88;
/** Movement (px) below which a press is treated as a plain click on the link. */
const CLICK_TOLERANCE = 4;

/**
 * "Slide to unlock" link: dragging the key to the end opens the link. A plain click,
 * a tap or the keyboard follow the link directly, so nothing is gated behind the gesture.
 */
export default function SlideToContact({ href, label }: SlideToContactProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ startX: 0, origin: 0, moved: false, active: false });
  const [maxTravel, setMaxTravel] = useState(0);
  const [status, setStatus] = useState<SliderStatus>('idle');
  const x = useMotionValue(0);

  const progress = useTransform(x, (value) => (maxTravel > 0 ? value / maxTravel : 0));
  const fillWidth = useTransform(x, (value) => value + HANDLE_SIZE);
  const labelOpacity = useTransform(progress, [0, 0.5], [1, 0]);
  const keyRotation = useTransform(progress, [0, 1], [0, 90]);
  const lockOpacity = useTransform(progress, [0.55, 0.85], [1, 0]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setMaxTravel(track.clientWidth - HANDLE_SIZE - TRACK_PADDING * 2);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  function reset(delay = 0) {
    window.setTimeout(() => {
      animate(x, 0, { type: 'spring', stiffness: 380, damping: 32 });
      setStatus('idle');
    }, delay);
  }

  function handlePointerDown(event: PointerEvent<HTMLAnchorElement>) {
    if (status === 'done' || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { startX: event.clientX, origin: x.get(), moved: false, active: true };
    setStatus('dragging');
  }

  function handlePointerMove(event: PointerEvent<HTMLAnchorElement>) {
    if (!drag.current.active) return;
    const delta = event.clientX - drag.current.startX;
    if (Math.abs(delta) > CLICK_TOLERANCE) drag.current.moved = true;
    x.set(Math.min(Math.max(drag.current.origin + delta, 0), maxTravel));
  }

  function handlePointerUp() {
    if (!drag.current.active) return;
    drag.current.active = false;

    if (maxTravel > 0 && x.get() >= maxTravel * COMPLETE_AT) {
      animate(x, maxTravel, { duration: 0.2, ease: 'easeOut' });
      setStatus('done');
      window.open(href, '_blank', 'noopener,noreferrer');
      reset(1800);
    } else {
      reset();
    }
  }

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    // A drag either already opened the link or was abandoned; only plain clicks navigate.
    if (drag.current.moved) {
      event.preventDefault();
      drag.current.moved = false;
    }
  }

  const done = status === 'done';

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <div
          ref={trackRef}
          className="relative h-16 w-full max-w-[30rem] touch-pan-y overflow-hidden rounded-full border border-line-strong bg-surface select-none"
        >
          <m.span
            aria-hidden="true"
            className="absolute inset-y-[3px] left-[3px] rounded-full bg-accent"
            style={{ width: fillWidth }}
          />

          <m.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-16 left-20 flex items-center text-[15px] font-medium whitespace-nowrap text-fg-muted"
            style={{ opacity: labelOpacity }}
          >
            {label}
          </m.span>

          <m.span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 text-fg-subtle"
            style={{ opacity: lockOpacity }}
          >
            <PadlockIcon open={false} />
          </m.span>

          <m.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onClick={handleClick}
            draggable={false}
            style={{ x }}
            className={cn(
              'absolute top-[3px] left-[3px] grid size-14 cursor-grab place-items-center rounded-full bg-accent text-accent-fg shadow-[0_6px_18px_-6px] shadow-black/60 active:cursor-grabbing',
              status === 'dragging' ? 'scale-[0.97]' : 'transition-[scale] duration-200',
            )}
          >
            <span className="sr-only">{label} (se abre en una pestaña nueva)</span>
            <span aria-hidden="true" className="grid place-items-center">
              <m.span
                className={cn(
                  'col-start-1 row-start-1 grid place-items-center transition-[opacity,scale] duration-300',
                  done && 'scale-50 opacity-0',
                )}
                style={{ rotate: keyRotation }}
              >
                <KeyMark className="size-6" />
              </m.span>
              <span
                className={cn(
                  'col-start-1 row-start-1 grid place-items-center transition-[opacity,scale] duration-300 ease-snappy',
                  done ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
                )}
              >
                <PadlockIcon open={done} />
              </span>
            </span>
          </m.a>
        </div>
        <p aria-live="polite" className="sr-only">
          {done ? 'Abriendo WhatsApp' : ''}
        </p>
      </LazyMotion>
    </MotionConfig>
  );
}
