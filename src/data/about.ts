import safeOpeningImage from '@/assets/images/work-safe-opening.jpg';
import gateMotorImage from '@/assets/images/work-gate-motor.jpg';
import gateLockImage from '@/assets/images/hero-technician.jpg';
import safeLockImage from '@/assets/images/work-safe-lock.jpg';

export interface Pillar {
  title: string;
  description: string;
}

export const pillars: readonly Pillar[] = [
  { title: 'Cerrajeros expertos', description: 'Personal capacitado, de alta calidad y certificado.' },
  {
    title: 'Tecnología de punta',
    description: 'Trabajamos con tecnología actual, atentos a las nuevas tendencias mundiales.',
  },
  { title: 'Los mejores precios', description: 'Un servicio profesional, siempre con los mejores precios.' },
  { title: 'Soporte 24/7', description: 'Soporte técnico las 24 horas, los 7 días de la semana.' },
];

export interface WorkPhoto {
  title: string;
  category: string;
  image: ImageMetadata;
  alt: string;
}

/** Photos from the "Algunos de nuestros trabajos" gallery of the original site. */
export const workPhotos: readonly WorkPhoto[] = [
  {
    title: 'Apertura de caja fuerte',
    category: 'Cajas fuertes',
    image: safeOpeningImage,
    alt: 'Técnico de Cerrajería Arrieta abriendo una caja fuerte de gran tamaño',
  },
  {
    title: 'Instalación de motor',
    category: 'Portones eléctricos',
    image: gateMotorImage,
    alt: 'Técnico preparando el motor de un portón eléctrico',
  },
  {
    title: 'Cerradura de portón',
    category: 'Residencial',
    image: gateLockImage,
    alt: 'Técnico trabajando en la cerradura de un portón de hierro',
  },
  {
    title: 'Caja fuerte digital y mecánica',
    category: 'Cajas fuertes',
    image: safeLockImage,
    alt: 'Caja fuerte con teclado digital y perilla de combinación',
  },
];
