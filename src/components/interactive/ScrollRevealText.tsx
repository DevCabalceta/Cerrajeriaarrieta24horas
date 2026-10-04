import { useRef } from 'react';
import { LazyMotion, domAnimation, m, useScroll, useTransform, type MotionValue } from 'motion/react';
import { cn } from '@/utils/cn';
import { useMediaQuery } from './hooks/useMediaQuery';

export interface InlineImage {
  src: string;
  alt: string;
}

export type RevealSegment = string | InlineImage;

interface ScrollRevealTextProps {
  segments: readonly RevealSegment[];
  className?: string;
}

type Token = { kind: 'word'; value: string } | { kind: 'image'; image: InlineImage };

/** Resting opacity keeps unrevealed words above 3:1 contrast for large text. */
const DIM_OPACITY = 0.4;
/** Portion of the scroll range each token takes to light up; overlapping ranges smooth the cascade. */
const SPREAD = 0.14;

function tokenize(segments: readonly RevealSegment[]): Token[] {
  return segments.flatMap<Token>((segment) =>
    typeof segment === 'string'
      ? segment
          .split(/[ \t\n]+/)
          .filter(Boolean)
          .map((value) => ({ kind: 'word', value }))
      : [{ kind: 'image', image: segment }],
  );
}

function ImageChip({ image }: { image: InlineImage }) {
  return (
    <span className="group/chip relative mx-[0.08em] inline-block h-[0.78em] w-[1.5em] translate-y-[0.06em] overflow-hidden rounded-full bg-surface align-baseline">
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className="size-full object-cover grayscale transition-[filter] duration-500 group-hover/chip:grayscale-0"
      />
    </span>
  );
}

function RevealToken({ token, progress, range }: { token: Token; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [DIM_OPACITY, 1]);
  const scale = useTransform(progress, range, [0.6, 1]);

  if (token.kind === 'word') return <m.span style={{ opacity }}>{token.value}</m.span>;

  return (
    <m.span className="inline-block" style={{ opacity, scale }}>
      <ImageChip image={token.image} />
    </m.span>
  );
}

function StaticToken({ token }: { token: Token }) {
  return token.kind === 'word' ? <span>{token.value}</span> : <ImageChip image={token.image} />;
}

export default function ScrollRevealText({ segments, className }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });
  const tokens = tokenize(segments);
  const step = (1 - SPREAD) / Math.max(tokens.length - 1, 1);

  return (
    <LazyMotion features={domAnimation} strict>
      <p ref={ref} className={cn('text-pretty', className)}>
        {tokens.map((token, index) => (
          <span key={index}>
            {prefersReducedMotion ? (
              <StaticToken token={token} />
            ) : (
              <RevealToken token={token} progress={scrollYProgress} range={[index * step, index * step + SPREAD]} />
            )}
            {index < tokens.length - 1 && ' '}
          </span>
        ))}
      </p>
    </LazyMotion>
  );
}
