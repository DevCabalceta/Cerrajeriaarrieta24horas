import { cn } from '@/utils/cn';

export function AvailabilityBadge({ className }: { className?: string }) {
  return (
    <span className={cn('items-center gap-2.5 font-mono text-label uppercase text-fg-muted', className)}>
      <span aria-hidden="true" className="relative flex size-1.5">
        <span className="absolute inset-0 animate-beacon rounded-full bg-accent" />
        <span className="relative size-1.5 rounded-full bg-accent" />
      </span>
      Disponible 24/7
    </span>
  );
}
