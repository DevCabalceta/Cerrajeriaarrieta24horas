/** [longitude, latitude] */
export type GeoPoint = readonly [number, number];

/** Simplified outline of Costa Rica, traced clockwise from the Pacific end of the northern border. */
export const costaRicaOutline: readonly GeoPoint[] = [
  [-85.7, 11.08],
  [-85.62, 11.21],
  [-85.3, 11.1],
  [-84.9, 10.95],
  [-84.68, 11.08],
  [-84.35, 10.97],
  [-84.2, 10.8],
  [-83.95, 10.72],
  [-83.67, 10.93],
  [-83.53, 10.6],
  [-83.3, 10.35],
  [-83.05, 10.05],
  [-83.0, 9.95],
  [-82.85, 9.75],
  [-82.75, 9.65],
  [-82.56, 9.57],
  [-82.83, 9.48],
  [-82.88, 9.25],
  [-82.93, 8.95],
  [-82.85, 8.6],
  [-82.84, 8.45],
  [-82.88, 8.03],
  [-83.05, 8.32],
  [-83.15, 8.55],
  [-83.27, 8.72],
  [-83.33, 8.6],
  [-83.28, 8.4],
  [-83.45, 8.43],
  [-83.6, 8.47],
  [-83.73, 8.6],
  [-83.68, 8.72],
  [-83.63, 8.85],
  [-83.75, 9.1],
  [-83.88, 9.25],
  [-84.16, 9.43],
  [-84.4, 9.53],
  [-84.63, 9.61],
  [-84.68, 9.8],
  [-84.83, 9.98],
  [-85.0, 10.12],
  [-85.23, 10.2],
  [-85.1, 10.0],
  [-84.95, 9.85],
  [-85.0, 9.72],
  [-85.11, 9.56],
  [-85.35, 9.75],
  [-85.53, 9.88],
  [-85.67, 10.0],
  [-85.8, 10.15],
  [-85.85, 10.3],
  [-85.8, 10.5],
  [-85.7, 10.62],
  [-85.8, 10.8],
  [-85.93, 10.85],
  [-85.75, 10.95],
];

/** The GAM is drawn as a band around the Alajuela–Cartago axis of the Central Valley. */
export const gamAxis = {
  from: [-84.26, 10.03] as GeoPoint,
  to: [-83.9, 9.85] as GeoPoint,
  radius: 0.085,
};

export type CoverageTier = 'gam' | 'appointment';

export interface CoverageLocation {
  id: string;
  name: string;
  /** Short context shown under the name, e.g. the reference city. */
  detail: string;
  tier: CoverageTier;
  position: GeoPoint;
}

export const coverageLocations: readonly CoverageLocation[] = [
  { id: 'san-jose', name: 'San José', detail: 'Gran Área Metropolitana', tier: 'gam', position: [-84.083, 9.933] },
  { id: 'heredia', name: 'Heredia', detail: 'Gran Área Metropolitana', tier: 'gam', position: [-84.117, 9.998] },
  { id: 'alajuela', name: 'Alajuela', detail: 'Gran Área Metropolitana', tier: 'gam', position: [-84.214, 10.016] },
  { id: 'cartago', name: 'Cartago', detail: 'Gran Área Metropolitana', tier: 'gam', position: [-83.919, 9.864] },
  { id: 'guanacaste', name: 'Guanacaste', detail: 'Liberia, Nicoya y alrededores', tier: 'appointment', position: [-85.437, 10.635] },
  { id: 'puntarenas', name: 'Puntarenas', detail: 'Pacífico Central', tier: 'appointment', position: [-84.838, 9.976] },
  { id: 'limon', name: 'Limón', detail: 'Caribe', tier: 'appointment', position: [-83.035, 9.991] },
  { id: 'zona-norte', name: 'Zona Norte', detail: 'San Carlos y alrededores', tier: 'appointment', position: [-84.43, 10.323] },
  { id: 'zona-sur', name: 'Zona Sur', detail: 'Pérez Zeledón y alrededores', tier: 'appointment', position: [-83.703, 9.374] },
];

export const coverageTiers: Record<CoverageTier, { label: string; summary: string }> = {
  gam: {
    label: 'Cobertura 24/7',
    summary: 'Atención a domicilio las 24 horas, todos los días del año, en toda la Gran Área Metropolitana.',
  },
  appointment: {
    label: 'Servicio con cita',
    summary: 'Le atendemos coordinando una cita previa. Escríbanos y agendamos el día y la hora.',
  },
};

export function getCoverageMessage(location: CoverageLocation): string {
  return location.tier === 'gam'
    ? `Hola, necesito un servicio de cerrajería en ${location.name}.`
    : `Hola, quisiera agendar una cita para un servicio de cerrajería en ${location.name}.`;
}
