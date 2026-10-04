import { useEffect, useState } from 'react';
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from 'motion/react';

const formatter = new Intl.DateTimeFormat('es-CR', {
  timeZone: 'America/Costa_Rica',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
});

const PLACEHOLDER = '--:--:--';

/** Rolls a single character when it changes. Grid stacking keeps both glyphs in one cell during the swap. */
function RollingChar({ char }: { char: string }) {
  return (
    <span className="inline-grid overflow-hidden">
      <AnimatePresence initial={false}>
        <m.span
          key={char}
          className="col-start-1 row-start-1"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {char}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

/** Current time in Costa Rica, rendered on the client only to avoid hydration mismatches. */
export default function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    let interval: number | undefined;
    const tick = () => setTime(formatter.format(new Date()));

    // Pause while the tab is hidden: no wasted work and no queued digit animations.
    const sync = () => {
      window.clearInterval(interval);
      if (document.hidden) return;
      tick();
      interval = window.setInterval(tick, 1000);
    };

    sync();
    document.addEventListener('visibilitychange', sync);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  const characters = [...(time ?? PLACEHOLDER)];

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <span className="inline-flex items-center gap-3 font-mono text-label uppercase">
          <span aria-hidden="true" className="relative flex size-1.5">
            <span className="absolute inset-0 animate-beacon rounded-full bg-accent-fg" />
            <span className="relative size-1.5 rounded-full bg-accent-fg" />
          </span>
          <span className="sr-only">Disponibles las 24 horas, todos los días</span>
          <span aria-hidden="true" className="flex items-center gap-3">
            <span>Costa Rica</span>
            <span className="flex text-[13px] tabular-nums">
              {characters.map((char, index) => (
                <RollingChar key={index} char={char} />
              ))}
            </span>
            <span className="text-accent-fg/70">Disponibles ahora</span>
          </span>
        </span>
      </LazyMotion>
    </MotionConfig>
  );
}
