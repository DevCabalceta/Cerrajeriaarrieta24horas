import { KeyMark } from './icons';

/** Wordmark lockup. The key "turns" when the parent `group` is hovered. */
export function BrandLogo() {
  return (
    <span className="flex items-center gap-2.5 perspective-midrange">
      <KeyMark className="size-[22px] text-accent transition-transform duration-500 ease-smooth group-hover:rotate-x-180 group-focus-visible:rotate-x-180" />
      <span className="text-[17px] font-semibold leading-none tracking-[-0.03em] text-fg">Arrieta</span>
      <span className="border-l border-line-strong pl-2.5 font-mono text-label uppercase leading-none text-fg-subtle">
        24h
      </span>
    </span>
  );
}
