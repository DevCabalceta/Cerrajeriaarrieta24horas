import { useEffect, useState, type ReactNode } from 'react';
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  animate,
  domAnimation,
  m,
  useMotionValue,
  useTransform,
} from 'motion/react';
import { coverageTiers, getCoverageMessage, type CoverageLocation, type CoverageTier } from '@/data/coverage';
import { getWhatsAppUrl } from '@/utils/contact';
import type { MapPoint } from '@/utils/geo';
import { cn } from '@/utils/cn';
import { CtaLink } from '@/components/ui/CtaLink';
import { useMediaQuery } from './hooks/useMediaQuery';

export interface MappedLocation extends CoverageLocation {
  point: MapPoint;
}

interface CoverageSimulatorProps {
  locations: readonly MappedLocation[];
  /** Where routes start: the heart of the GAM. */
  origin: MapPoint;
  size: { width: number; height: number };
  /** Static dot map rendered by Astro. */
  children: ReactNode;
}

const ease = [0.22, 1, 0.36, 1] as const;
const ROUTE_DURATION = 1.1;

/** Quadratic curve bowed to the left of the travel direction, so routes read as arcs. */
function getControlPoint(from: MapPoint, to: MapPoint): MapPoint {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const bow = 0.22;
  return { x: midX + (to.y - from.y) * bow, y: midY - (to.x - from.x) * bow };
}

function Route({ from, to, instant }: { from: MapPoint; to: MapPoint; instant: boolean }) {
  const control = getControlPoint(from, to);
  const progress = useMotionValue(instant ? 1 : 0);
  const travelerX = useTransform(progress, (t) => (1 - t) ** 2 * from.x + 2 * (1 - t) * t * control.x + t ** 2 * to.x);
  const travelerY = useTransform(progress, (t) => (1 - t) ** 2 * from.y + 2 * (1 - t) * t * control.y + t ** 2 * to.y);

  useEffect(() => {
    if (instant) return;
    const playback = animate(progress, 1, { duration: ROUTE_DURATION, ease });
    return () => playback.stop();
  }, [instant, progress]);

  return (
    <g>
      <m.path
        d={`M${from.x} ${from.y} Q${control.x} ${control.y} ${to.x} ${to.y}`}
        fill="none"
        className="stroke-accent"
        strokeWidth="2"
        initial={{ pathLength: instant ? 1 : 0, opacity: 0.9 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: instant ? 0 : ROUTE_DURATION, ease }}
      />
      <m.circle cx={travelerX} cy={travelerY} r="6" className="fill-accent" />
      {!instant && <Pulse at={to} delay={ROUTE_DURATION - 0.1} />}
    </g>
  );
}

function Pulse({ at, delay, size = 34 }: { at: MapPoint; delay: number; size?: number }) {
  return (
    <m.circle
      cx={at.x}
      cy={at.y}
      fill="none"
      className="stroke-accent"
      strokeWidth="2"
      initial={{ r: 6, opacity: 0 }}
      animate={{ r: [6, size], opacity: [0.8, 0] }}
      transition={{ duration: 1.3, delay, ease: 'easeOut', repeat: 1, repeatDelay: 0.2 }}
    />
  );
}

function TierMarker({ tier }: { tier: CoverageTier }) {
  return (
    <span
      aria-hidden="true"
      className={cn('size-2.5 rounded-full', tier === 'gam' ? 'bg-accent' : 'border-[1.5px] border-fg bg-transparent')}
    />
  );
}

export default function CoverageSimulator({ locations, origin, size, children }: CoverageSimulatorProps) {
  const [selectedId, setSelectedId] = useState(locations[0]?.id);
  const isWide = useMediaQuery('(min-width: 640px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const selected = locations.find((location) => location.id === selectedId) ?? locations[0];
  if (!selected) return null;

  const tier = coverageTiers[selected.tier];
  const groups: { tier: CoverageTier; legend: string }[] = [
    { tier: 'gam', legend: 'Gran Área Metropolitana · 24/7' },
    { tier: 'appointment', legend: 'Resto del país · con cita' },
  ];
  const labelSize = isWide ? 15 : 28;

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <div className="relative">
              {children}
              <svg
                aria-hidden="true"
                viewBox={`0 0 ${size.width} ${size.height}`}
                className="absolute inset-0 size-full overflow-visible"
              >
                {selected.tier === 'gam' ? (
                  !prefersReducedMotion && (
                    <g key={`gam-${selected.id}`}>
                      <Pulse at={origin} delay={0} size={110} />
                      <Pulse at={origin} delay={0.45} size={110} />
                    </g>
                  )
                ) : (
                  <Route key={selected.id} from={origin} to={selected.point} instant={prefersReducedMotion} />
                )}

                {locations.map((location) => {
                  const isSelected = location.id === selected.id;
                  const isGam = location.tier === 'gam';
                  const showLabel = !isGam && (isWide || isSelected);
                  // Labels next to the GAM cluster go on the left so they never collide with it.
                  const labelOnLeft = location.point.x < origin.x && Math.abs(location.point.y - origin.y) < 50;
                  return (
                    <g
                      key={location.id}
                      onClick={() => setSelectedId(location.id)}
                      className="group cursor-pointer"
                    >
                      <circle cx={location.point.x} cy={location.point.y} r="22" fill="transparent" />
                      <circle
                        cx={location.point.x}
                        cy={location.point.y}
                        r={isGam ? 4.5 : isSelected ? 8 : 6.5}
                        strokeWidth="2"
                        className={cn(
                          'transition-[fill,stroke] duration-300',
                          isGam ? 'fill-accent stroke-canvas' : 'fill-canvas',
                          !isGam && (isSelected ? 'stroke-accent' : 'stroke-fg/70 group-hover:stroke-fg'),
                        )}
                      />
                      {showLabel && (
                        <text
                          x={location.point.x + (labelOnLeft ? -14 : 14)}
                          y={location.point.y + labelSize * 0.35}
                          textAnchor={labelOnLeft ? 'end' : 'start'}
                          className={cn(
                            'font-mono uppercase transition-colors duration-300',
                            isSelected ? 'fill-fg' : 'fill-fg-muted group-hover:fill-fg',
                          )}
                          style={{ fontSize: labelSize, letterSpacing: '0.06em' }}
                        >
                          {location.name}
                        </text>
                      )}
                    </g>
                  );
                })}

                <text
                  x={origin.x - 18}
                  y={origin.y - 34}
                  textAnchor="end"
                  className="fill-accent font-mono"
                  style={{ fontSize: labelSize, letterSpacing: '0.08em' }}
                >
                  GAM · 24/7
                </text>
              </svg>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-label text-fg-subtle uppercase">
              <span className="flex items-center gap-2">
                <TierMarker tier="gam" /> 24/7 a domicilio
              </span>
              <span className="flex items-center gap-2">
                <TierMarker tier="appointment" /> Con cita
              </span>
              <span className="ml-auto">Mapa ilustrativo</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="font-mono text-label text-fg-subtle uppercase">¿Dónde necesita el servicio?</p>
            {groups.map((group) => (
              <fieldset key={group.tier} className="mt-6">
                <legend className="flex items-center gap-2 text-[13px] font-medium text-fg-muted">
                  <TierMarker tier={group.tier} />
                  {group.legend}
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {locations
                    .filter((location) => location.tier === group.tier)
                    .map((location) => (
                      <label key={location.id} className="cursor-pointer">
                        <input
                          type="radio"
                          name="ubicacion"
                          value={location.id}
                          checked={location.id === selected.id}
                          onChange={() => setSelectedId(location.id)}
                          className="peer sr-only"
                        />
                        <span className="inline-flex h-10 items-center rounded-full border border-line-strong px-4 text-[14px] font-medium text-fg-muted transition-[background-color,color,border-color,scale] duration-300 ease-smooth peer-checked:border-fg peer-checked:bg-fg peer-checked:text-canvas peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:border-white/30 hover:text-fg peer-checked:hover:text-canvas active:scale-[0.97]">
                          {location.name}
                        </span>
                      </label>
                    ))}
                </div>
              </fieldset>
            ))}

            <div aria-live="polite" className="mt-10 border-t border-line pt-8">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.25, ease }}
                >
                  <p
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-label uppercase',
                      selected.tier === 'gam' ? 'bg-accent text-accent-fg' : 'border border-line-strong text-fg',
                    )}
                  >
                    {tier.label}
                  </p>
                  <h3 className="mt-5 text-title font-medium">{selected.name}</h3>
                  <p className="mt-1 font-mono text-label text-fg-subtle uppercase">{selected.detail}</p>
                  <p className="mt-4 max-w-[30rem] text-[16px] leading-relaxed text-pretty text-fg-muted">
                    {tier.summary}
                  </p>
                  <CtaLink
                    href={getWhatsAppUrl(getCoverageMessage(selected))}
                    icon="whatsapp"
                    external
                    className="mt-8 w-fit"
                  >
                    {selected.tier === 'gam' ? 'Solicitar servicio' : 'Agendar cita'}
                  </CtaLink>
                </m.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}
