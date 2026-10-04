import { contact } from '@/data/site';

export function getWhatsAppUrl(message: string = contact.whatsapp.defaultMessage): string {
  return `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function getPhoneUrl(): string {
  return `tel:+${contact.phone.countryCode}${contact.phone.number}`;
}

export function getEmailUrl(): string {
  return `mailto:${contact.email}`;
}
