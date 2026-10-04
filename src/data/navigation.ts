export interface NavItem {
  id: string;
  label: string;
  href: `#${string}`;
}

export const mainNavigation: readonly NavItem[] = [
  { id: 'servicios', label: 'Servicios', href: '#servicios' },
  { id: 'emergencias', label: 'Emergencias', href: '#emergencias' },
  { id: 'portones', label: 'Portones', href: '#portones' },
  { id: 'cobertura', label: 'Cobertura', href: '#cobertura' },
  { id: 'nosotros', label: 'Nosotros', href: '#nosotros' },
];

export interface FooterLink {
  label: string;
  href: `#${string}`;
}

export const footerNavigation: readonly FooterLink[] = [
  { label: 'Inicio', href: '#top' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Especialidades', href: '#especialidades' },
  { label: 'Emergencias 24/7', href: '#emergencias' },
  { label: 'Portones eléctricos', href: '#portones' },
  { label: 'Cobertura', href: '#cobertura' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Preguntas frecuentes', href: '#preguntas-frecuentes' },
  { label: 'Contacto', href: '#contacto' },
];

export const footerServices: readonly FooterLink[] = [
  { label: 'Cerrajería residencial', href: '#servicios' },
  { label: 'Cerrajería comercial', href: '#servicios' },
  { label: 'Cerrajería automotriz', href: '#servicios' },
  { label: 'Apertura de cajas fuertes', href: '#especialidades' },
  { label: 'Llaves con chip', href: '#especialidades' },
  { label: 'Portones eléctricos', href: '#portones' },
];
