import type { APIRoute } from 'astro';
import { coverageLocations } from '@/data/coverage';
import { faqItems } from '@/data/faq';
import { footerNavigation } from '@/data/navigation';
import { gateServices, serviceCategories, specialtyServices } from '@/data/services';
import { business, contact, coverage, seo, social } from '@/data/site';
import { getWhatsAppUrl } from '@/utils/contact';

const list = (items: readonly string[]) => items.map((item) => `- ${item}`).join('\n');

/**
 * Plain-language summary for AI assistants and generative search engines (https://llmstxt.org).
 * Built from the same data as the page, so it can never contradict the visible content.
 */
export const GET: APIRoute = ({ site }) => {
  const home = new URL('/', site).href;
  const gam = coverageLocations.filter((location) => location.tier === 'gam').map((location) => location.name);
  const byAppointment = coverageLocations
    .filter((location) => location.tier === 'appointment')
    .map((location) => `${location.name} (${location.detail})`);

  const sections = [
    `# ${business.name}`,
    `> Cerrajería profesional en Costa Rica con más de ${business.yearsOfExperience} años de experiencia. Atiende a domicilio las 24 horas, los 7 días de la semana, todo el año, en toda la ${coverage.region} (${gam.join(', ')}); en el resto del país, con cita previa.`,
    'No tiene local de atención al público: el servicio es a domicilio. El contacto más rápido es por WhatsApp o por teléfono.',
    `## Contacto\n\n${list([
      `Teléfono y WhatsApp: ${contact.phone.display}`,
      `WhatsApp directo: ${getWhatsAppUrl()}`,
      `Correo: ${contact.email}`,
      `Facebook: ${social.facebook}`,
      'Horario: 24 horas, 7 días a la semana, todo el año',
      `Sitio web: ${home}`,
    ])}`,
    `## Cobertura\n\n${list([
      `Atención 24/7 a domicilio: toda la ${coverage.region} (${gam.join(', ')}).`,
      `Servicio con cita previa en el resto del país: ${byAppointment.join('; ')}.`,
    ])}`,
    `## Servicios\n\n${serviceCategories
      .map((category) => `### ${category.label}\n\n${category.description}\n\n${list(category.services)}`)
      .join('\n\n')}`,
    `## Servicios especializados\n\n${list(specialtyServices.map((service) => `${service.title}: ${service.description}`))}`,
    `## Portones eléctricos\n\n${list(gateServices.map((service) => `${service.title}: ${service.description}`))}`,
    `## Preguntas frecuentes\n\n${faqItems.map((item) => `### ${item.question}\n\n${item.answer}`).join('\n\n')}`,
    `## Secciones del sitio\n\n${list(footerNavigation.map((link) => `[${link.label}](${new URL(link.href, home).href})`))}`,
    `## Descripción breve\n\n${seo.description}`,
  ];

  return new Response(`${sections.join('\n\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
