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
          { id: 'a1-v1', name: 'Honda Navi 110cc', image: 'https://res.cloudinary.com/dh18s2vc3/image/upload/v1763701937/a1-1_o0rnmt.webp', videoSrc: 'https://res.cloudinary.com/dh18s2vc3/video/upload/v1763701003/Honda_Navi_110cc_Automa%CC%81tica_mh6miq.mp4' },
        ],
      },
      {
        id: 'a-2',
        code: 'A-2',
        title: 'DE 126CC HASTA 500CC',
        description: 'Bicimotos y motocicletas desde 126cc hasta 500cc; triciclos y cuadraciclos desde 251cc hasta 500cc',
        vehicles: [
          { id: 'a2-v1', name: 'Scooter Automática 150cc', image: 'https://res.cloudinary.com/dh18s2vc3/image/upload/v1763701937/a2-1_gft8hn.webp' },
          { id: 'a2-v2', name: 'Nova Automática 150cc', image: 'https://res.cloudinary.com/dh18s2vc3/image/upload/v1763701938/a2-2_cyjrdn.webp', videoSrc: 'https://res.cloudinary.com/dh18s2vc3/video/upload/v1763702276/Nova_Automa%CC%81tica_150cc_xoqhem.mp4' },
          { id: 'a2-v3', name: 'ZS Cambios 150cc', image: 'https://res.cloudinary.com/dh18s2vc3/image/upload/v1763701938/a2-3_lpt5oz.webp', videoSrc: 'https://res.cloudinary.com/dh18s2vc3/video/upload/v1763705149/ZS_Cambios_150cc_ncxsux.mp4' },
        ],
      },
      {
        id: 'a-3',
        code: 'A-3',
        title: 'DE 501CC EN ADELANTE',
        description: 'Bicimotos, motocicletas, triciclos y cuadraciclos desde 501cc en adelante',
        vehicles: [
          { id: 'a3-v1', name: 'Honda TRX Automático 520cc', image: 'https://res.cloudinary.com/dh18s2vc3/image/upload/v1763701938/a3-1_lozqrv.webp', videoSrc: 'https://res.cloudinary.com/dh18s2vc3/video/upload/v1763702705/Honda_TRX_Automa%CC%81tico_520cc_kog9ak.mp4' },
          { id: 'a3-v2', name: 'Honda XR 650cc', image: 'https://res.cloudinary.com/dh18s2vc3/image/upload/v1763701940/a3-2_qrnz9b.webp', videoSrc: 'https://res.cloudinary.com/dh18s2vc3/video/upload/v1763701782/Honda_XR_650cc_pdvimk.mp4' },
          { id: 'a3-v3', name: 'X-ADV Automático 750cc', image: 'https://res.cloudinary.com/dh18s2vc3/image/upload/v1763701940/a3-3_oooimz.webp', videoSrc: 'https://res.cloudinary.com/dh18s2vc3/video/upload/v1763702701/X-ADV_Automa%CC%81tico_750cc_ggwvoa.mp4' },
          { id: 'a3-v4', name: 'BMW GS 650cc', image: 'https://res.cloudinary.com/dh18s2vc3/image/upload/v1763701940/a3-4_nkj4li.webp', videoSrc: 'https://res.cloudinary.com/dh18s2vc3/video/upload/v1763701003/BMW_GS_650cc_r70aw4.mp4' },
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
          { id: 'b1-v1', name: 'Toyota IQ Automático', image: 'https://res.cloudinary.com/dh18s2vc3/image/upload/v1763700982/Toyota_IQ_Automa%CC%81tico_rgzno6.webp', videoSrc: "https://res.cloudinary.com/dh18s2vc3/video/upload/v1763702056/Toyota_IQ_Automa%CC%81tico_rwsp52.mp4" },
          { id: 'b1-v2', name: 'Yaris Hatchback Automático', image: "https://res.cloudinary.com/dh18s2vc3/image/upload/v1763701941/b1-1_c8femk.webp", videoSrc: "https://res.cloudinary.com/dh18s2vc3/video/upload/v1763701783/Yaris_Hatchback_Automa%CC%81tico_makace.mp4" },
          { id: 'b1-v3', name: 'Hyundai i10 Automático', image: 'https://res.cloudinary.com/dh18s2vc3/image/upload/v1763700982/Hyundai_i10_Automa%CC%81tico_vwaqzb.png', videoSrc: "https://res.cloudinary.com/dh18s2vc3/video/upload/v1763701007/Hyundai_i10_Automa%CC%81tico_admfru.mp4" },
        ],
      },
      {
        id: 'b-2',
        code: 'B-2',
        title: 'De 4,001kg hasta 8,000kg',
        description: '',
        vehicles: [
          { id: 'b2-v1', name: 'Isuzu NPR Automático', image: 'https://res.cloudinary.com/dh18s2vc3/image/upload/v1763701943/b3-1_gihtgq.webp' },
        ],
      },
      {
        id: 'b-3',
        code: 'B-3',
        title: 'De 8,001kg en adelante',
        description: '',
        vehicles: [
          { id: 'b3-v1', name: 'Isuzu NRR Automático', image: 'https://res.cloudinary.com/dh18s2vc3/image/upload/v1763701943/b3-1_gihtgq.webp', videoSrc: 'https://res.cloudinary.com/dh18s2vc3/video/upload/v1763701004/Isuzu_NRR_Automa%CC%81tico_zdikpb.mp4' },
        ],
      },
      {
        id: 'b-4',
        code: 'B-4',
        title: 'De 8,001kg en adelante + ARTICULADO',
        description: '',
        vehicles: [
          { id: 'b4-v1', name: 'International Automático Cureña 20 pies', image: 'https://res.cloudinary.com/dh18s2vc3/image/upload/v1763701943/b4-1_foee3k.webp', videoSrc: 'https://res.cloudinary.com/dh18s2vc3/video/upload/v1763706380/International_Automa%CC%81tico_Curen%CC%83a_20_pies_uz9haw.mp4' },
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
          { id: 'c2-v1', name: 'Microbus', image: 'https://res.cloudinary.com/dh18s2vc3/image/upload/v1763700981/Microbus_gc1iks.webp' },
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
          { id: 'c2-v1', name: 'Busetas', image: 'https://res.cloudinary.com/dh18s2vc3/image/upload/v1763700983/Buseta_e4anei.webp' },
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
          { id: 'c2-v1', name: 'Bus', image: 'https://res.cloudinary.com/dh18s2vc3/image/upload/v1763701945/c2-bus_nu8a5j.webp', videoSrc: 'https://res.cloudinary.com/dh18s2vc3/video/upload/v1763702704/Bus_z0ngny.mp4'  },
          // { id: 'c2-v2', name: 'Volvo 9700', image: '/assets/i10-left-removebg-preview.png' },
          // { id: 'c2-v3', name: 'Hino AK8J', image: '/assets/i10-left-removebg-preview.png' },
        ],
      },
    ],
  },
];
