import { cn } from '@/utils/cn';
import { ArrowUpRightIcon } from './icons';

/** Diagonal arrow that exits and re-enters when the parent `group` is hovered or focused. */
export function ArrowSwap({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn('relative grid shrink-0 place-items-center overflow-hidden rounded-full', className)}>
      <ArrowUpRightIcon className="size-3.5 transition-transform duration-300 ease-smooth group-hover:translate-x-[150%] group-hover:-translate-y-[150%] group-focus-visible:translate-x-[150%] group-focus-visible:-translate-y-[150%]" />
      <ArrowUpRightIcon className="absolute size-3.5 -translate-x-[150%] translate-y-[150%] transition-transform duration-300 ease-smooth group-hover:translate-x-0 group-hover:translate-y-0 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0" />
    </span>
  );
}
