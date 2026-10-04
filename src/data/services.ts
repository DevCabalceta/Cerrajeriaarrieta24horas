import residentialImage from '@/assets/images/service-residential.jpg';
import commercialImage from '@/assets/images/service-commercial.jpg';
import automotiveImage from '@/assets/images/service-automotive.jpg';
import gatesImage from '@/assets/images/service-gates.jpg';

export interface ServiceCategory {
  id: string;
  label: string;
  title: string;
  description: string;
  services: readonly string[];
  whatsappMessage: string;
  image: ImageMetadata;
  imageAlt: string;
  /** In-page section with more detail about this category. */
  detailLink?: { href: `#${string}`; label: string };
}

export const serviceCategories: readonly ServiceCategory[] = [
  {
    id: 'residencial',
    label: 'Residencial',
    title: 'Su casa, accesible y segura.',
    description:
      'Le ayudamos a entrar cuando se queda afuera y a reforzar la seguridad de su hogar con cerraduras confiables.',
    services: [
      'Apertura de casas',
      'Cambio de combinación de cerraduras',
      'Reparación, venta e instalación de cerraduras, llavines y candados',
      'Copias de todo tipo de llaves, con o sin muestra',
    ],
    whatsappMessage: 'Hola, necesito un servicio de cerrajería para mi casa.',
    image: residentialImage,
    imageAlt: 'Llave insertada en la cerradura de una puerta',
  },
  {
    id: 'comercial',
    label: 'Comercial',
    title: 'Oficinas y locales bajo control.',
    description: 'Acceso rápido a su oficina o local y una gestión de llaves pensada para negocios.',
    services: [
      'Apertura de oficinas y locales',
      'Amaestramiento de cerraduras y candados',
      'Apertura de cajas fuertes digitales y mecánicas',
    ],
    whatsappMessage: 'Hola, necesito un servicio de cerrajería para mi negocio.',
    image: commercialImage,
    imageAlt: 'Puerta de oficina con tirador metálico',
  },
  {
    id: 'automotriz',
    label: 'Automotriz',
    title: 'Su vehículo, sin contratiempos.',
    description: 'Aperturas para diversos tipos de autos y llaves listas para usar, a domicilio y a cualquier hora.',
    services: [
      'Apertura de vehículos',
      'Copias y programación de llaves con chip',
      'Venta de controles, carcasas y forros',
    ],
    whatsappMessage: 'Hola, necesito un servicio de cerrajería para mi vehículo.',
    image: automotiveImage,
    imageAlt: 'Llave en el encendido de un vehículo',
  },
  {
    id: 'portones-electricos',
    label: 'Portones eléctricos',
    title: 'Portones que responden.',
    description: 'Mantenimiento, reparación y automatización para que su portón funcione cada vez que lo necesita.',
    services: [
      'Mantenimiento preventivo y reparación de portones y motores',
      'Venta e instalación de motores de cremallera, cadena y pistones',
      'Venta y programación de controles',
    ],
    whatsappMessage: 'Hola, necesito un servicio para mi portón eléctrico.',
    image: gatesImage,
    imageAlt: 'Portón corredizo de una residencia',
    detailLink: { href: '#portones', label: 'Ver portones eléctricos' },
  },
];

export type SpecialtyIcon = 'safe' | 'broken-key' | 'chip-key' | 'master-key' | 'key-copy' | 'padlock';

export interface SpecialtyService {
  id: string;
  title: string;
  description: string;
  icon: SpecialtyIcon;
  whatsappMessage: string;
}

export const specialtyServices: readonly SpecialtyService[] = [
  {
    id: 'cajas-fuertes',
    title: 'Apertura de cajas fuertes',
    description: 'Cajas fuertes digitales y mecánicas, con reparaciones precisas sin causar daños.',
    icon: 'safe',
    whatsappMessage: 'Hola, necesito el servicio de apertura de cajas fuertes.',
  },
  {
    id: 'llaves-quebradas',
    title: 'Extracción de llaves quebradas',
    description: 'Retiramos la llave rota de la cerradura y le confeccionamos una nueva, a domicilio.',
    icon: 'broken-key',
    whatsappMessage: 'Hola, necesito extraer una llave quebrada.',
  },
  {
    id: 'llaves-con-chip',
    title: 'Llaves con chip',
    description: 'Copias y programación para una variedad de marcas y modelos de vehículos.',
    icon: 'chip-key',
    whatsappMessage: 'Hola, necesito una copia o programación de llave con chip.',
  },
  {
    id: 'amaestramiento',
    title: 'Amaestramiento',
    description: 'Cerraduras, chapas y candados con llaves individuales y una llave maestra.',
    icon: 'master-key',
    whatsappMessage: 'Hola, me interesa el servicio de amaestramiento de cerraduras.',
  },
  {
    id: 'copias-de-llaves',
    title: 'Llaves con o sin muestra',
    description: 'Duplicamos y confeccionamos todo tipo de llaves, aunque no tenga la original.',
    icon: 'key-copy',
    whatsappMessage: 'Hola, necesito copias o confección de llaves.',
  },
  {
    id: 'candados',
    title: 'Candados y combinaciones',
    description: 'Apertura de candados y cambio de combinación de cerraduras, las 24 horas.',
    icon: 'padlock',
    whatsappMessage: 'Hola, necesito ayuda con un candado o el cambio de combinación de una cerradura.',
  },
];

export interface GateService {
  title: string;
  description: string;
}

export const gateServices: readonly GateService[] = [
  {
    title: 'Reparación y restauración',
    description: 'Restauramos y reparamos portones eléctricos para que vuelvan a funcionar de forma óptima.',
  },
  {
    title: 'Mantenimiento preventivo',
    description: 'Mantenimiento de portones y motores eléctricos para alargar su vida útil y evitar fallas.',
  },
  {
    title: 'Motores',
    description: 'Venta e instalación de motores de cremallera, cadena y pistones.',
  },
  {
    title: 'Controles',
    description: 'Venta y programación de controles remotos para su portón.',
  },
];

export type GateMotorType = 'cremallera' | 'cadena' | 'pistones';

export interface GateMotor {
  id: GateMotorType;
  label: string;
  description: string;
}

export const gateMotors: readonly GateMotor[] = [
  {
    id: 'cremallera',
    label: 'Cremallera',
    description: 'Para portones corredizos: el piñón del motor engrana con una cremallera dentada fijada al portón.',
  },
  {
    id: 'cadena',
    label: 'Cadena',
    description: 'Para portones corredizos: una cadena tensada a lo largo del recorrido arrastra el portón.',
  },
  {
    id: 'pistones',
    label: 'Pistones',
    description: 'Para portones abatibles: un brazo por hoja empuja cada hoja hasta abrirla.',
  },
];

export const gateQuoteMessage = 'Hola, quiero una cotización para mi portón eléctrico.';
