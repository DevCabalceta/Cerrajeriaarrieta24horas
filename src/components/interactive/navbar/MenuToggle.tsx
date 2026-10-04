import type { Ref } from 'react';
import { cn } from '@/utils/cn';

interface MenuToggleProps {
  open: boolean;
  controls: string;
  onToggle: () => void;
  ref?: Ref<HTMLButtonElement>;
}

const line = 'absolute right-0 h-[1.5px] rounded-full bg-fg transition-[translate,rotate,width] duration-400 ease-smooth';

export function MenuToggle({ open, controls, onToggle, ref }: MenuToggleProps) {
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={open}
      aria-controls={controls}
      aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
      onClick={onToggle}
      className="group relative grid size-11 place-items-center rounded-full border border-line-strong transition-[background-color,scale] duration-200 ease-smooth hover:bg-white/[0.06] active:scale-95 lg:hidden"
    >
      <span aria-hidden="true" className="relative block h-[10px] w-[18px]">
        <span className={cn(line, 'top-0 w-full', open && 'translate-y-[4.25px] rotate-45')} />
        <span
          className={cn(
            line,
            'bottom-0',
            open ? 'w-full -translate-y-[4.25px] -rotate-45' : 'w-[11px] group-hover:w-full',
          )}
        />
      </span>
    </button>
  );
}
