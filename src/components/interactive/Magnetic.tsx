import { useRef, type PointerEvent, type ReactNode } from 'react';
import { LazyMotion, domAnimation, m, useReducedMotion, useSpring } from 'motion/react';
import { useMediaQuery } from './hooks/useMediaQuery';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** Fraction of the pointer offset the element follows. */
  strength?: number;
}

const spring = { stiffness: 260, damping: 18, mass: 0.4 };

export function Magnetic({ children, className, strength = 0.28 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);
  const prefersReducedMotion = useReducedMotion();
  const hasFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const enabled = hasFinePointer && !prefersReducedMotion;

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        ref={ref}
        className={className}
        style={{ x, y }}
        onPointerMove={handlePointerMove}
        onPointerLeave={reset}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
