import { useState } from 'react';
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from 'motion/react';
import { getEmergencyMessage, type EmergencyScenario } from '@/data/emergencies';
import { getWhatsAppUrl } from '@/utils/contact';
import { CtaLink } from '@/components/ui/CtaLink';
import { ArrowUpRightIcon } from '@/components/ui/icons';

interface EmergencyContactProps {
  scenarios: readonly EmergencyScenario[];
  phone: { href: string; prefix: string; number: string; display: string };
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function EmergencyContact({ scenarios, phone }: EmergencyContactProps) {
  const [selectedId, setSelectedId] = useState(scenarios[0]?.id);
  const selected = scenarios.find((scenario) => scenario.id === selectedId) ?? scenarios[0];
  if (!selected) return null;

  const message = getEmergencyMessage(selected);

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <fieldset>
              <legend className="font-mono text-label text-accent-fg/70 uppercase">¿Qué le pasó?</legend>
              <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                {scenarios.map((scenario) => (
                  <label key={scenario.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="emergencia"
                      value={scenario.id}
                      checked={scenario.id === selected.id}
                      onChange={() => setSelectedId(scenario.id)}
                      className="peer sr-only"
                    />
                    <span className="flex h-full min-h-12 items-center rounded-2xl border border-accent-fg/25 px-3.5 py-2 text-[14px] leading-snug font-medium sm:h-11 sm:min-h-0 sm:rounded-full sm:px-4 sm:py-0 sm:text-[15px] transition-[background-color,color,border-color,scale] duration-300 ease-smooth peer-checked:border-accent-fg peer-checked:bg-accent-fg peer-checked:text-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-fg hover:border-accent-fg/70 active:scale-[0.97]">
                      {scenario.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-10">
              <p className="font-mono text-label text-accent-fg/70 uppercase">Su mensaje</p>
              <div aria-live="polite" className="mt-3 max-w-[34rem] rounded-2xl rounded-bl-sm bg-accent-fg/[0.07] px-5 py-4">
                <AnimatePresence mode="wait" initial={false}>
                  <m.p
                    key={selected.id}
                    className="text-[17px] leading-relaxed"
                    initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                    transition={{ duration: 0.25, ease }}
                  >
                    {message}
                  </m.p>
                </AnimatePresence>
              </div>
              <CtaLink href={getWhatsAppUrl(message)} variant="inverse" icon="whatsapp" external className="mt-6 w-fit">
                Enviar por WhatsApp
              </CtaLink>
            </div>
          </div>

          <div className="flex flex-col border-accent-fg/15 lg:col-span-5 lg:border-l lg:pl-12">
            <p className="font-mono text-label text-accent-fg/70 uppercase">O llame ahora</p>
            <a href={phone.href} aria-label={`Llamar al ${phone.display}`} className="group mt-5 w-fit">
              <span className="flex items-center gap-3 font-mono text-[13px] text-accent-fg/70">
                {phone.prefix}
                <ArrowUpRightIcon className="size-4 transition-transform duration-300 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span className="relative mt-1 block pb-2 text-[clamp(3rem,1.6rem+5vw,5.25rem)] leading-none font-medium tracking-[-0.045em] whitespace-nowrap tabular-nums">
                {phone.number}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-right scale-x-0 bg-accent-fg transition-transform duration-500 ease-smooth group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100"
                />
              </span>
            </a>
            <p className="mt-8 max-w-[24rem] text-[15px] leading-relaxed text-accent-fg/75 lg:mt-auto">
              Atendemos a domicilio las 24 horas, los 7 días de la semana, todo el año.
            </p>
          </div>
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}
