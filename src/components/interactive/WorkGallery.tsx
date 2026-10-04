import { useState } from 'react';
import { cn } from '@/utils/cn';

export interface GalleryItem {
  title: string;
  category: string;
  alt: string;
  src: string;
  srcSet: string;
}

const pad = (value: number) => String(value).padStart(2, '0');

/**
 * Expanding panels on desktop (hover, focus or tap widens a photo and reveals its caption);
 * a horizontal snap carousel on smaller screens, where every caption is visible.
 */
export default function WorkGallery({ items }: { items: readonly GalleryItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <ul className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-2 overflow-x-auto px-5 pb-2 sm:scroll-px-8 [scrollbar-width:none] sm:-mx-8 sm:px-8 md:mx-0 md:h-[32rem] md:overflow-visible md:px-0 md:pb-0 lg:h-[36rem]">
      {items.map((item, index) => {
        const isActive = index === active;
        return (
          <li
            key={item.src}
            onPointerEnter={(event) => event.pointerType === 'mouse' && setActive(index)}
            className={cn(
              'relative h-[28rem] w-[80vw] max-w-[22rem] shrink-0 snap-start',
              'md:h-auto md:w-auto md:max-w-none md:min-w-0 md:shrink md:basis-0 md:transition-[flex-grow] md:duration-700 md:ease-smooth',
              isActive ? 'md:grow-[3.2]' : 'md:grow',
            )}
          >
            <button
              type="button"
              onClick={() => setActive(index)}
              onFocus={() => setActive(index)}
              aria-label={`${item.title}, ${item.category}`}
              className="relative block size-full overflow-hidden bg-surface text-left focus-visible:outline-offset-[-2px]"
            >
              <img
                src={item.src}
                srcSet={item.srcSet}
                sizes="(min-width: 768px) 55vw, 80vw"
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className={cn(
                  'absolute inset-0 size-full object-cover brightness-90 grayscale transition-[filter,scale] duration-700 ease-smooth',
                  isActive ? 'md:scale-100 md:grayscale-0' : 'md:scale-105',
                )}
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 flex flex-col bg-gradient-to-t from-black/80 via-black/35 to-transparent px-5 pt-20 pb-5 whitespace-nowrap"
              >
                <span className="font-mono text-label text-fg-muted uppercase">
                  {pad(index + 1)}
                  <span
                    className={cn(
                      'transition-opacity duration-500',
                      isActive ? 'md:opacity-100' : 'md:opacity-0',
                    )}
                  >
                    {' '}
                    · {item.category}
                  </span>
                </span>
                <span
                  className={cn(
                    'mt-2 text-xl font-medium tracking-[-0.02em] text-fg transition-[opacity,translate] duration-500 ease-smooth',
                    isActive ? 'md:translate-y-0 md:opacity-100' : 'md:translate-y-2 md:opacity-0',
                  )}
                >
                  {item.title}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
