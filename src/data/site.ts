export const business = {
  name: 'Cerrajería Arrieta 24 Horas',
  shortName: 'Arrieta',
  url: 'https://cerrajeriaarrieta24horas.com',
  yearsOfExperience: 40,
} as const;

export const contact = {
  phone: {
    countryCode: '506',
    number: '72041289',
    display: '+506 7204 1289',
  },
  whatsapp: {
    number: '50672041289',
    defaultMessage: 'Hola, quiero más información sobre sus servicios de cerrajería.',
  },
  email: 'pamelac2398@gmail.com',
} as const;

export const social = {
  facebook: 'https://www.facebook.com/profile.php?id=100047196894398',
} as const;

export const developer = {
  name: 'Gabriel Cabalceta',
  url: 'https://devcabalceta.vercel.app/es',
} as const;

export const coverage = {
  primary: ['San José', 'Heredia', 'Alajuela', 'Cartago'],
  region: 'Gran Área Metropolitana',
  national: 'Todo el territorio nacional',
} as const;

export const seo = {
  title: 'Cerrajería 24 Horas a Domicilio en Costa Rica | Arrieta',
  description:
    'Cerrajería a domicilio 24/7 en San José, Heredia, Alajuela y Cartago: apertura de casas y carros, cajas fuertes, llaves con chip y portones eléctricos.',
  locale: 'es_CR',
  language: 'es-CR',
  themeColor: '#0a0a0b',
  logo: '/brand/arrieta-logo.png',
  image: {
    src: '/og-image.jpg',
    width: 1200,
    height: 630,
    alt: 'Cerrajería Arrieta 24 Horas: cerrajeros a domicilio 24/7 en Costa Rica',
  },
} as const;
