import { KeyMark } from './icons';

/** Wordmark lockup. The key "turns" when the parent `group` is hovered. */
export function BrandLogo() {
  return (
    <span className="flex shrink-0 items-center gap-2 perspective-midrange min-[380px]:gap-2.5">
      <KeyMark className="size-[22px] shrink-0 text-accent transition-transform duration-500 ease-smooth group-hover:rotate-x-180 group-focus-visible:rotate-x-180" />
      <span className="whitespace-nowrap text-[15px] font-semibold leading-none tracking-[-0.03em] text-fg min-[380px]:text-[17px]">
        Cerrajería Arrieta
      </span>
      <span className="hidden border-l border-line-strong pl-2.5 font-mono text-label uppercase leading-none text-fg-subtle min-[380px]:inline">
        24h
      </span>
    </span>
  );
}
