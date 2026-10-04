import { useRef, type PointerEvent, type ReactNode } from 'react';
import { LazyMotion, domAnimation, m, useReducedMotion, useSpring } from 'motion/react';
import { useMediaQuery } from './hooks/useMediaQuery';

interface PointerParallaxProps {
  children: ReactNode;
  className?: string;
  /** Maximum travel in pixels, opposite to the pointer. */
  strength?: number;
}

const spring = { stiffness: 120, damping: 20, mass: 0.6 };

/** Shifts its content slightly against the pointer to give a sense of depth. */
export function PointerParallax({ children, className, strength = 12 }: PointerParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);
  const prefersReducedMotion = useReducedMotion();
  const hasFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const enabled = hasFinePointer && !prefersReducedMotion;

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(-((event.clientX - rect.left) / rect.width - 0.5) * strength);
    y.set(-((event.clientY - rect.top) / rect.height - 0.5) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={ref} className={className} onPointerMove={handlePointerMove} onPointerLeave={reset}>
        <m.div className="size-full" style={{ x, y, scale: 1.06 }}>
          {children}
        </m.div>
      </div>
    </LazyMotion>
  );
}
