export interface EmergencyScenario {
  id: string;
  label: string;
  /** Completes the sentence "Hola, tengo una emergencia: …". */
  situation: string;
}

export const emergencyScenarios: readonly EmergencyScenario[] = [
  { id: 'casa', label: 'Me quedé afuera de mi casa', situation: 'me quedé afuera de mi casa' },
  { id: 'vehiculo', label: 'No puedo abrir mi vehículo', situation: 'no puedo abrir mi vehículo' },
  { id: 'llave-quebrada', label: 'Se quebró la llave', situation: 'se me quebró una llave en la cerradura' },
  { id: 'negocio', label: 'No puedo entrar a mi negocio', situation: 'no puedo entrar a mi oficina o local' },
  { id: 'caja-fuerte', label: 'No abre la caja fuerte', situation: 'no puedo abrir una caja fuerte' },
  { id: 'porton', label: 'El portón no responde', situation: 'mi portón eléctrico no responde' },
];

export function getEmergencyMessage(scenario: EmergencyScenario): string {
  return `Hola, tengo una emergencia: ${scenario.situation}. ¿Me pueden ayudar?`;
}
