import { useId, useState } from 'react';
import { LazyMotion, MotionConfig, domAnimation, m } from 'motion/react';
import type { FaqItem } from '@/data/faq';
import { cn } from '@/utils/cn';

const ease = [0.22, 1, 0.36, 1] as const;
const pad = (value: number) => String(value).padStart(2, '0');

/** Single-open accordion. Answers stay in the DOM (collapsed) so they remain indexable. */
export default function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <ul className="border-t border-line">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const questionId = `${baseId}-q${index}`;
            const answerId = `${baseId}-a${index}`;

            return (
              <li key={item.question} className="border-b border-line">
                <h4>
                  <button
                    type="button"
                    id={questionId}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="group flex w-full items-start gap-4 py-6 text-left sm:gap-6 sm:py-7"
                  >
                    <span
                      className={cn(
                        'mt-1.5 w-6 shrink-0 font-mono text-label tabular-nums transition-colors duration-300',
                        isOpen ? 'text-accent' : 'text-fg-subtle',
                      )}
                    >
                      {pad(index + 1)}
                    </span>
                    <span
                      className={cn(
                        'flex-1 text-lg leading-snug font-medium tracking-[-0.015em] text-balance transition-[color,translate] duration-300 ease-smooth sm:text-xl',
                        isOpen ? 'text-fg' : 'text-fg/85 group-hover:translate-x-1 group-hover:text-fg',
                      )}
                    >
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        'relative grid size-9 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,rotate] duration-500 ease-smooth',
                        isOpen
                          ? 'rotate-180 border-accent bg-accent text-accent-fg'
                          : 'border-line-strong text-fg group-hover:border-white/30',
                      )}
                    >
                      <span className="absolute h-[1.5px] w-3.5 rounded-full bg-current" />
                      <span
                        className={cn(
                          'absolute h-3.5 w-[1.5px] rounded-full bg-current transition-[scale] duration-500 ease-smooth',
                          isOpen && 'scale-y-0',
                        )}
                      />
                    </span>
                  </button>
                </h4>

                <m.div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  inert={!isOpen}
                  className="overflow-hidden"
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <m.p
                    className="max-w-[44rem] pr-2 pb-7 pl-10 text-[16px] leading-relaxed text-pretty text-fg-muted sm:pr-16 sm:pl-12 sm:text-[17px]"
                    initial={false}
                    animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
                    transition={{ duration: isOpen ? 0.45 : 0.2, delay: isOpen ? 0.1 : 0, ease }}
                  >
                    {item.answer}
                  </m.p>
                </m.div>
              </li>
            );
          })}
        </ul>
      </LazyMotion>
    </MotionConfig>
  );
}
