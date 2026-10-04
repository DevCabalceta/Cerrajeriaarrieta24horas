import { useRef, useState } from 'react';
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  animate,
  domAnimation,
  m,
  useMotionValue,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from 'motion/react';
import type { GateMotor, GateMotorType } from '@/data/services';
import { cn } from '@/utils/cn';
import { ArrowUpIcon } from '@/components/ui/icons';
import { useMediaQuery } from './hooks/useMediaQuery';

type GateStatus = 'closed' | 'opening' | 'open' | 'closing';

const statusLabels: Record<GateStatus, string> = {
  closed: 'Cerrado',
  opening: 'Abriendo…',
  open: 'Abierto',
  closing: 'Cerrando…',
};

const ease = [0.22, 1, 0.36, 1] as const;
/** Seconds for a full open or close cycle; partial moves take proportionally less. */
const FULL_TRAVEL = 1.8;
/** How far the sliding gate travels to the left when fully open, in SVG units. */
const SLIDE_DISTANCE = 258;
/** Swing leaves rotate up to this angle, in degrees. */
const SWING_ANGLE = 85;

/** Frames each diagram; compact frames crop the side walls so the gate reads larger on phones. */
const viewBoxes: Record<'sliding' | 'swing', { wide: string; compact: string }> = {
  sliding: { wide: '0 48 480 190', compact: '96 48 384 190' },
  swing: { wide: '0 34 480 190', compact: '48 34 384 190' },
};

const viewLabels: Record<'sliding' | 'swing', string> = {
  sliding: 'Vista frontal · Portón corredizo',
  swing: 'Vista superior · Portón abatible',
};

const GATE_BARS = Array.from({ length: 10 }, (_, index) => 180 + 25 * (index + 1));
const RACK_PATH = (() => {
  let path = 'M180 190';
  for (let x = 180; x < 454; x += 8) path += ` L${x + 4} 195 L${x + 8} 190`;
  return path;
})();

function Annotation({ x, y, label, toX, toY }: { x: number; y: number; label: string; toX: number; toY: number }) {
  return (
    <g className="text-fg-subtle">
      <line x1={x} y1={y + 4} x2={toX} y2={toY} stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
      <text x={x} y={y} fill="currentColor" className="font-mono text-[11px] tracking-[0.08em]">
        {label}
      </text>
    </g>
  );
}

function SlidingGate({ progress, drive }: { progress: MotionValue<number>; drive: 'cremallera' | 'cadena' }) {
  const gateX = useTransform(progress, [0, 1], [0, -SLIDE_DISTANCE]);
  const gearRotation = useTransform(progress, [0, 1], [0, -620]);

  return (
    <>
      <line x1="0" y1="204" x2="480" y2="204" className="stroke-line-strong" strokeWidth="1" />
      <rect x="4" y="96" width="164" height="108" className="stroke-line-strong" fill="none" strokeDasharray="3 4" />
      <rect x="168" y="70" width="10" height="134" className="fill-surface stroke-fg/60" />
      <rect x="458" y="70" width="10" height="134" className="fill-surface stroke-fg/60" />

      <m.g style={{ x: gateX }} className="stroke-fg" fill="none" strokeWidth="1.5">
        <rect x="180" y="84" width="274" height="106" rx="1" className="fill-canvas/60" />
        <line x1="180" y1="98" x2="454" y2="98" />
        {GATE_BARS.map((x) => (
          <line key={x} x1={x} y1="98" x2={x} y2="190" strokeWidth="1" className="stroke-fg/50" />
        ))}
        <circle cx="200" cy="198" r="5" />
        <circle cx="434" cy="198" r="5" />
        {drive === 'cremallera' ? (
          <path d={RACK_PATH} className="stroke-accent" strokeWidth="1.25" strokeLinejoin="round" />
        ) : (
          <line
            x1="180"
            y1="193"
            x2="454"
            y2="193"
            className="stroke-accent"
            strokeWidth="3"
            strokeDasharray="4 3"
            strokeLinecap="round"
          />
        )}
      </m.g>

      <g className="stroke-accent" fill="none" strokeWidth="1.5">
        <rect x="190" y="170" width="44" height="34" rx="3" className="fill-surface" />
        <m.g style={{ rotate: gearRotation }}>
          <circle cx="212" cy="190" r="8" />
          <path d="M212 179v4M212 197v4M201 190h4M219 190h4" />
        </m.g>
      </g>

      <Annotation x={244} y={226} label="MOTOR" toX={226} toY={204} />
      <Annotation
        x={330}
        y={226}
        label={drive === 'cremallera' ? 'CREMALLERA' : 'CADENA'}
        toX={320}
        toY={196}
      />
    </>
  );
}

const HINGE_LEFT = { x: 150, y: 170 };
const HINGE_RIGHT = { x: 330, y: 170 };
const LEAF_LENGTH = 90;
const PISTON_REACH = 55;

function SwingLeaf({ angle, side }: { angle: MotionValue<number>; side: 'left' | 'right' }) {
  const hinge = side === 'left' ? HINGE_LEFT : HINGE_RIGHT;
  const direction = side === 'left' ? 1 : -1;
  const anchor = { x: hinge.x - direction * 54, y: 150 };

  const radians = useTransform(angle, (value) => (value * Math.PI) / 180);
  const leafX = useTransform(radians, (r) => hinge.x + direction * LEAF_LENGTH * Math.cos(r));
  const leafY = useTransform(radians, (r) => hinge.y - LEAF_LENGTH * Math.sin(r));
  const pistonX = useTransform(radians, (r) => hinge.x + direction * PISTON_REACH * Math.cos(r));
  const pistonY = useTransform(radians, (r) => hinge.y - PISTON_REACH * Math.sin(r));

  return (
    <>
      <path
        d={`M${hinge.x + direction * LEAF_LENGTH} ${hinge.y} A${LEAF_LENGTH} ${LEAF_LENGTH} 0 0 ${side === 'left' ? 0 : 1} ${hinge.x} ${hinge.y - LEAF_LENGTH}`}
        fill="none"
        className="stroke-line-strong"
        strokeDasharray="3 4"
      />
      <m.line x1={hinge.x} y1={hinge.y} x2={leafX} y2={leafY} className="stroke-fg" strokeWidth="5" strokeLinecap="round" />
      <m.line
        x1={anchor.x}
        y1={anchor.y}
        x2={pistonX}
        y2={pistonY}
        className="stroke-accent"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx={anchor.x} cy={anchor.y} r="3.5" className="fill-accent" />
      <rect x={hinge.x - 5} y={hinge.y - 5} width="10" height="10" className="fill-surface stroke-fg/60" />
    </>
  );
}

function SwingGate({ progress }: { progress: MotionValue<number> }) {
  const angle = useTransform(progress, [0, 1], [0, SWING_ANGLE]);

  return (
    <>
      <line x1="8" y1="170" x2="145" y2="170" className="stroke-fg/40" strokeWidth="6" />
      <line x1="335" y1="170" x2="472" y2="170" className="stroke-fg/40" strokeWidth="6" />
      <SwingLeaf angle={angle} side="left" />
      <SwingLeaf angle={angle} side="right" />
      <text x="240" y="196" textAnchor="middle" className="fill-fg-subtle font-mono text-[11px] tracking-[0.08em]">
        CALLE
      </text>
      <text x="240" y="60" textAnchor="middle" className="fill-fg-subtle font-mono text-[11px] tracking-[0.08em]">
        PROPIEDAD
      </text>
      <Annotation x={56} y={124} label="PISTÓN" toX={90} toY={148} />
    </>
  );
}

export default function GateSimulator({ motors }: { motors: readonly GateMotor[] }) {
  const [type, setType] = useState<GateMotorType>(motors[0]?.id ?? 'cremallera');
  const [status, setStatus] = useState<GateStatus>('closed');
  const progress = useMotionValue(0);
  const playback = useRef<AnimationPlaybackControls | null>(null);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isWide = useMediaQuery('(min-width: 640px)');

  const selectedIndex = Math.max(
    motors.findIndex((motor) => motor.id === type),
    0,
  );
  const selected = motors[selectedIndex];
  const opening = status === 'closed' || status === 'closing';

  function selectType(id: GateMotorType) {
    playback.current?.stop();
    progress.set(0);
    setStatus('closed');
    setType(id);
  }

  function toggleGate() {
    const target = opening ? 1 : 0;
    playback.current?.stop();
    setStatus(opening ? 'opening' : 'closing');

    const remaining = Math.abs(target - progress.get());
    playback.current = animate(progress, target, {
      duration: prefersReducedMotion ? 0 : FULL_TRAVEL * remaining,
      ease: [0.45, 0, 0.2, 1],
      onComplete: () => setStatus(target === 1 ? 'open' : 'closed'),
    });
  }

  const moving = status === 'opening' || status === 'closing';
  const layout = type === 'pistones' ? 'swing' : 'sliding';

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <div className="border border-line bg-surface/40">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-3 sm:p-4">
            <fieldset className="relative grid w-full grid-cols-3 rounded-full border border-line p-1 sm:w-auto">
              <legend className="sr-only">Tipo de motor</legend>
              <m.span
                aria-hidden="true"
                className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-fg"
                initial={false}
                animate={{ x: `${selectedIndex * 100}%` }}
                transition={{ type: 'spring', stiffness: 420, damping: 36 }}
              />
              {motors.map((motor) => (
                <label key={motor.id} className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="tipo-de-motor"
                    value={motor.id}
                    checked={motor.id === type}
                    onChange={() => selectType(motor.id)}
                    className="peer sr-only"
                  />
                  <span className="flex h-9 items-center justify-center rounded-full px-4 text-[13px] font-medium text-fg-muted transition-colors duration-300 peer-checked:text-canvas peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:text-fg peer-checked:hover:text-canvas">
                    {motor.label}
                  </span>
                </label>
              ))}
            </fieldset>
            <span className="hidden font-mono text-label text-fg-subtle uppercase sm:block">Simulador</span>
          </div>

          <div className="bg-[radial-gradient(circle,rgb(255_255_255/0.07)_1px,transparent_1px)] bg-[size:16px_16px] px-3 pt-4 sm:px-6 sm:pt-6">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={type}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease }}
              >
                <p className="font-mono text-label text-fg-subtle uppercase">{viewLabels[layout]}</p>
                <svg
                  viewBox={viewBoxes[layout][isWide ? 'wide' : 'compact']}
                  role="img"
                  aria-label={`Diagrama de un portón con motor de ${selected?.label.toLowerCase()}: ${statusLabels[status].toLowerCase()}`}
                  className="mt-2 h-auto w-full overflow-hidden"
                >
                  {type === 'pistones' ? <SwingGate progress={progress} /> : <SlidingGate progress={progress} drive={type} />}
                </svg>
              </m.div>
            </AnimatePresence>
          </div>

          <div className="min-h-[4.5rem] border-t border-line px-4 py-4 sm:px-6">
            <AnimatePresence mode="wait" initial={false}>
              <m.p
                key={type}
                className="max-w-[36rem] text-[15px] leading-relaxed text-fg-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {selected?.description}
              </m.p>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-line p-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={cn(
                  'size-2 rounded-full transition-colors duration-300',
                  status === 'closed' ? 'bg-fg-subtle' : 'bg-accent',
                  moving && 'animate-pulse',
                )}
              />
              <p className="font-mono text-label uppercase">
                <span className="text-fg-subtle">Estado · </span>
                <span aria-live="polite" className="text-fg">
                  {statusLabels[status]}
                </span>
              </p>
            </div>

            <m.button
              type="button"
              onClick={toggleGate}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex h-12 shrink-0 items-center gap-2.5 rounded-full bg-accent pr-5 pl-4 text-[14px] font-semibold whitespace-nowrap text-accent-fg transition-colors duration-200 hover:bg-accent-strong"
            >
              <ArrowUpIcon
                className={cn('size-4 transition-transform duration-500 ease-smooth', !opening && 'rotate-180')}
              />
              {opening ? 'Abrir portón' : 'Cerrar portón'}
            </m.button>
          </div>
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}
