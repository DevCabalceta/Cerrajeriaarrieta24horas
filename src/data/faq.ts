import { business, contact } from './site';

export interface FaqItem {
  question: string;
  answer: string;
}

/** Every answer is grounded in information published by the business or confirmed by the owner. */
export const faqItems: readonly FaqItem[] = [
  {
    question: '¿Atienden emergencias las 24 horas?',
    answer: `Sí. Atendemos a domicilio las 24 horas, los 7 días de la semana, todo el año. Escríbanos por WhatsApp o llame al ${contact.phone.display}.`,
  },
  {
    question: '¿En qué zonas trabajan?',
    answer:
      'En toda la Gran Área Metropolitana (San José, Heredia, Alajuela y Cartago) le atendemos a domicilio las 24 horas. En el resto del país, como Guanacaste, Puntarenas o Limón, coordinamos el servicio con cita previa.',
  },
  {
    question: '¿Pueden abrir mi carro si dejé las llaves adentro?',
    answer: 'Sí. Realizamos aperturas para diversos tipos de autos, a domicilio y a cualquier hora.',
  },
  {
    question: '¿Hacen copias de llaves sin tener la original?',
    answer:
      'Sí. Duplicamos y confeccionamos todo tipo de llaves, con o sin muestra. También hacemos copias y programación de llaves con chip para una variedad de marcas y modelos de vehículos.',
  },
  {
    question: '¿Qué hago si se me quebró la llave dentro de la cerradura?',
    answer: 'Llámenos o escríbanos. Extraemos la llave quebrada y le confeccionamos una nueva, a domicilio.',
  },
  {
    question: '¿Abren cajas fuertes?',
    answer: 'Sí. Abrimos cajas fuertes digitales y mecánicas, y realizamos reparaciones precisas sin causar daños.',
  },
  {
    question: '¿Qué servicios ofrecen para portones eléctricos?',
    answer:
      'Reparación y restauración, mantenimiento preventivo, venta e instalación de motores de cremallera, cadena y pistones, y venta y programación de controles. Le preparamos una cotización personalizada.',
  },
  {
    question: '¿Cuánto cuesta el servicio?',
    answer:
      'Depende del tipo de trabajo y de la zona. Cuéntenos su caso por WhatsApp o por teléfono y le damos una cotización, siempre con los mejores precios.',
  },
  {
    question: '¿Entregan algún comprobante del trabajo?',
    answer: 'Sí. Entregamos un informe del servicio realizado.',
  },
  {
    question: '¿Su personal está capacitado?',
    answer: `Sí. Contamos con personal capacitado, de alta calidad y certificado, con más de ${business.yearsOfExperience} años de experiencia.`,
  },
];
