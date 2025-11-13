export interface Vehicle {
  id: string;
  name: string;
  image: string;
  description?: string;
  videoSrc?: string;
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
    subtitle: 'LICENCIA TIPO',
    types: [
      {
        id: 'a-1',
        code: 'A-1',
        title: 'HASTA 125CC',
        description: 'Bicimotos y motocicletas hasta 125cc; triciclos y cuadraciclos hasta 250cc',
        vehicles: [
          { id: 'a1-v1', name: 'Honda Navi 110cc', image: '/assets/a1-1.webp' },
        ],
      },
      {
        id: 'a-2',
        code: 'A-2',
        title: 'DE 126CC HASTA 500CC',
        description: 'Bicimotos y motocicletas desde 126cc hasta 500cc; triciclos y cuadraciclos desde 251cc hasta 500cc',
        vehicles: [
          { id: 'a2-v1', name: 'Scooter 150cc', image: '/assets/a2-1.webp' },
          { id: 'a2-v2', name: 'Nova Automática 150cc', image: '/assets/a2-2.webp', videoSrc: 'https://firebasestorage.googleapis.com/v0/b/carrocr-6bcb0.appspot.com/o/a2-2.mp4?alt=media&token=f0bf22e9-9ea0-4aba-b050-77134e357564' },
          { id: 'a2-v3', name: 'ZS Cambios 150cc', image: '/assets/a2-3.webp' },
        ],
      },
      {
        id: 'a-3',
        code: 'A-3',
        title: 'DE 501CC EN ADELANTE',
        description: 'Bicimotos, motocicletas, triciclos y cuadraciclos desde 501cc en adelante',
        vehicles: [
          { id: 'a3-v1', name: 'Honda TRX Automático 520cc', image: '/assets/a3-1.webp', videoSrc: 'https://firebasestorage.googleapis.com/v0/b/carrocr-6bcb0.appspot.com/o/a3-1.mp4?alt=media&token=71f30c8d-6ed7-4202-8805-2649078b7a11' },
          { id: 'a3-v2', name: 'Honda XR 650cc', image: '/assets/a3-2.webp' },
          { id: 'a3-v3', name: 'X-ADV Automático 750cc', image: '/assets/a3-3.webp', videoSrc: 'https://firebasestorage.googleapis.com/v0/b/carrocr-6bcb0.appspot.com/o/a3-3.mp4?alt=media&token=02a2e6f6-10c8-43ba-b13c-19a41f175b2b' },
          { id: 'a3-v4', name: 'MBW GS 650cc', image: '/assets/a3-4.webp' },
        ],
      },
    ],
  },
  {
    id: 'clase-b',
    className: 'B',
    title: 'Vehículos Particulares',
    subtitle: 'LICENCIA TIPO',
    types: [
      {
        id: 'b-1',
        code: 'B-1',
        title: 'Hasta 4,000kg',
        description: '',
        vehicles: [
          { id: 'b1-v1', name: 'Yaris Hatchback Automático', image: '/assets/b1-1.webp' },
          { id: 'b1-v2', name: 'Hyundai i10 Automático', image: '/assets/b1-2.webp' },
        ],
      },
      {
        id: 'b-2',
        code: 'B-2',
        title: 'De 4,001kg hasta 8,000kg',
        description: '',
        vehicles: [
          { id: 'b2-v1', name: 'Isuzu NPR Automático', image: '/assets/b3-1.webp' },
        ],
      },
      {
        id: 'b-3',
        code: 'B-3',
        title: 'De 8,001kg en adelante',
        description: '',
        vehicles: [
          { id: 'b3-v1', name: 'Isuzu NRR Automático', image: '/assets/b3-1.webp' },
        ],
      },
      {
        id: 'b-4',
        code: 'B-4',
        title: 'De 8,001kg en adelante + ARTICULADO',
        description: '',
        vehicles: [
          { id: 'b4-v1', name: 'International Automático Cureña 20 pies ', image: '/assets/b4-1.webp' },
        ],
      },
    ],
  },
  {
    id: 'clase-c',
    className: 'C',
    title: 'Transporte Público de Personas',
    subtitle: 'LICENCIA TIPO',
    types: [
      {
        id: 'c-2-microbus',
        code: 'C-2',
        title: 'MICROBUS',
        description: 'De 9 a 25 pasajeros',
        vehicles: [
          // { id: 'c2-v1', name: 'Mercedes-Benz Autobús', image: '/assets/i10-left-removebg-preview.png' },
          // { id: 'c2-v2', name: 'Volvo 9700', image: '/assets/i10-left-removebg-preview.png' },
          // { id: 'c2-v3', name: 'Hino AK8J', image: '/assets/i10-left-removebg-preview.png' },
        ],
      },
      {
        id: 'c-2-busetas',
        code: 'C-2',
        title: 'BUSETAS',
        description: 'De 26 a 44 pasajeros',
        vehicles: [
          // { id: 'c2-v1', name: 'Mercedes-Benz Autobús', image: '/assets/i10-left-removebg-preview.png' },
          // { id: 'c2-v2', name: 'Volvo 9700', image: '/assets/i10-left-removebg-preview.png' },
          // { id: 'c2-v3', name: 'Hino AK8J', image: '/assets/i10-left-removebg-preview.png' },
        ],
      },
      {
        id: 'c-2-bus',
        code: 'C-2',
        title: 'BUS',
        description: 'De 45 pasajeros en adelante',
        vehicles: [
          { id: 'c2-v1', name: 'Bus', image: '/assets/c2-bus.webp', videoSrc: 'https://firebasestorage.googleapis.com/v0/b/carrocr-6bcb0.appspot.com/o/c2-bus.mp4?alt=media&token=b5e2c117-f404-4b5b-8256-aa4b16e5fcb2'  },
          // { id: 'c2-v2', name: 'Volvo 9700', image: '/assets/i10-left-removebg-preview.png' },
          // { id: 'c2-v3', name: 'Hino AK8J', image: '/assets/i10-left-removebg-preview.png' },
        ],
      },
    ],
  },
];
