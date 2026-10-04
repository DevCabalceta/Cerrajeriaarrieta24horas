import { useEffect, useRef } from 'react';
import { LazyMotion, animate, domAnimation, m, useMotionValue, useTransform } from 'motion/react';

interface StatCounterProps {
  value: number;
  prefix?: string;
  className?: string;
}

/** Counts up to `value` the first time it scrolls into view. Server HTML already shows the final value. */
export default function StatCounter({ value, prefix = '', className }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(value);
  const display = useTransform(count, (current) => `${prefix}${Math.round(current)}`);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (element.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    count.set(0);
    let playback: ReturnType<typeof animate> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        playback = animate(count, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
        observer.disconnect();
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      playback?.stop();
    };
  }, [count, value]);

  return (
    <LazyMotion features={domAnimation} strict>
      <span className={className}>
        <m.span ref={ref} aria-hidden="true">
          {display}
        </m.span>
        <span className="sr-only">
          {prefix}
          {value}
        </span>
      </span>
    </LazyMotion>
  );
}
