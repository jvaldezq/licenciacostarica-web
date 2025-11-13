export interface Vehicle {
  id: string;
  name: string;
  image: string;
  description?: string;
}

export interface LicenseType {
  id: string;
  code: string;
  title: string;
  description: string;
  requirements?: string;
  vehicles: Vehicle[];
}

export interface LicenseClass {
  id: string;
  className: string;
  title: string;
  subtitle: string;
  features?: string[];
  types: LicenseType[];
}

export const licenseClasses: LicenseClass[] = [
  {
    id: 'clase-a',
    className: 'A',
    title: 'Motocicletas y Cuadraciclos',
    subtitle: 'NUESTRAS MOTOS',
    features: [
      'Alquiler y preparación completa',
      'Plantel privado, réplica exacta'
    ],
    types: [
      {
        id: 'a-1',
        code: 'A-1',
        title: 'HASTA 125CC',
        description: 'Bicimotos y motocicletas hasta 125cc; triciclos y cuadraciclos menores de 250cc',
        vehicles: [
          { id: 'a1-v1', name: 'Motocicleta 125cc', image: '/assets/a1-1.webp' },
        ],
      },
      {
        id: 'a-2',
        code: 'A-2',
        title: 'DE 126CC HASTA 500CC',
        description: 'Motocicletas hasta 500cc',
        vehicles: [
          { id: 'a2-v1', name: 'Motocicleta 500cc', image: '/assets/a2-1.webp' },
          { id: 'a2-v2', name: 'Motocicleta 500cc', image: '/assets/a2-2.webp' },
          { id: 'a2-v3', name: 'Motocicleta 500cc', image: '/assets/a2-3.webp' },
        ],
      },
      {
        id: 'a-3',
        code: 'A-3',
        title: 'MOTOCICLETAS +500CC',
        description: 'Motocicletas mayores de 500cc',
        vehicles: [
          { id: 'a3-v1', name: 'Motocicleta +500cc', image: '/assets/a3-1.webp' },
          { id: 'a3-v2', name: 'Motocicleta +500cc', image: '/assets/a3-2.webp' },
        ],
      },
    ],
  },
  {
    id: 'clase-b',
    className: 'B',
    title: 'Vehículos Particulares',
    subtitle: 'NUESTROS CARROS AUTOMÁTICOS',
    features: [
      'Alquiler y preparación completa',
      'Plantel privado, réplica exacta',
      'Zig zag, reversa, estacionamiento'
    ],
    types: [
      {
        id: 'b-1',
        code: 'B-1',
        title: 'VEHÍCULOS PARTICULARES',
        description: 'Automóviles particulares y pick-ups hasta 4,000kg (licencia estándar de carro); también triciclos/cuadraciclos menores de 550cc en vías no primarias',
        vehicles: [
          { id: 'b1-v1', name: 'Vehículo Particular', image: '/assets/b1-1.webp' },
          { id: 'b1-v2', name: 'Vehículo Particular', image: '/assets/b1-2.webp' },
        ],
      },
      {
        id: 'b-2',
        code: 'B-2',
        title: 'VEHÍCULOS MEDIANOS',
        description: 'Vehículos hasta 8,000kg',
        vehicles: [
          { id: 'b2-v1', name: 'Vehículo Mediano', image: '/assets/i10-left-removebg-preview.png' },
        ],
      },
      {
        id: 'b-3',
        code: 'B-3',
        title: 'VEHÍCULOS PESADOS',
        description: 'Vehículos de cualquier peso (excepto vehículos articulados)',
        vehicles: [
          { id: 'b3-v1', name: 'Vehículo Pesado', image: '/assets/b3-1.webp' },
        ],
      },
      {
        id: 'b-4',
        code: 'B-4',
        title: 'VEHÍCULOS ARTICULADOS',
        description: 'Vehículos articulados (tractocamión) de cualquier peso',
        vehicles: [
          { id: 'b4-v1', name: 'Vehículo Articulado', image: '/assets/b4-1.webp' },
        ],
      },
    ],
  },
  {
    id: 'clase-c',
    className: 'C',
    title: 'Transporte Público de Personas',
    subtitle: 'TRANSPORTE PÚBLICO',
    features: [
      'Alquiler de bus o taxi',
      'Práctica en pista y en ruta real',
      'Evaluación de ruta específica'
    ],
    types: [
      {
        id: 'c-2',
        code: 'C-2',
        title: 'AUTOBUSES',
        description: 'Autobuses, microbuses y minibuses',
        vehicles: [
          { id: 'c2-v1', name: 'Mercedes-Benz Autobús', image: '/assets/i10-left-removebg-preview.png' },
          { id: 'c2-v2', name: 'Volvo 9700', image: '/assets/i10-left-removebg-preview.png' },
          { id: 'c2-v3', name: 'Hino AK8J', image: '/assets/i10-left-removebg-preview.png' },
        ],
      },
    ],
  },
];
