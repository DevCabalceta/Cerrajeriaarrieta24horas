import { contact } from '@/data/site';
import { getPhoneUrl, getWhatsAppUrl } from '@/utils/contact';
import { ArrowSwap } from '@/components/ui/ArrowSwap';
import { PhoneIcon, WhatsAppIcon } from '@/components/ui/icons';
import { RollingText } from '@/components/ui/RollingText';
import { Magnetic } from '../Magnetic';
import { AvailabilityBadge } from './AvailabilityBadge';

const callLabel = `Llamar al ${contact.phone.display}`;

export function HeaderActions() {
  return (
    <div className="flex items-center gap-2">
      <AvailabilityBadge className="mr-3 hidden xl:flex" />

      <a
        href={getPhoneUrl()}
        aria-label={callLabel}
        className="group hidden h-10 items-center gap-2 rounded-full px-3.5 text-[13px] font-medium text-fg-muted transition-colors duration-150 hover:bg-white/[0.06] hover:text-fg lg:inline-flex"
      >
        <PhoneIcon className="size-4 origin-[50%_60%] group-hover:animate-ring" />
        <RollingText>
          <span className="xl:hidden">Llamar</span>
          <span className="hidden tabular-nums xl:inline">{contact.phone.display}</span>
        </RollingText>
      </a>

      <Magnetic className="hidden lg:block">
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-10 items-center gap-2 rounded-full bg-accent pr-1.5 pl-4 text-[13px] font-semibold text-accent-fg transition-[background-color,scale] duration-200 ease-smooth hover:bg-accent-strong active:scale-[0.97]"
        >
          <WhatsAppIcon className="size-4" />
          <RollingText>WhatsApp</RollingText>
          <span className="sr-only">(se abre en una pestaña nueva)</span>
          <ArrowSwap className="ml-1 size-7 bg-accent-fg text-accent" />
        </a>
      </Magnetic>

      <a
        href={getPhoneUrl()}
        aria-label={callLabel}
        className="group grid size-11 place-items-center rounded-full bg-accent text-accent-fg transition-[scale] duration-200 ease-smooth active:scale-95 lg:hidden"
      >
        <PhoneIcon className="size-[18px] origin-[50%_60%] group-hover:animate-ring" />
      </a>
    </div>
  );
}
