const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
    <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
  </svg>
);

const WazeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.66 17.52a7 7 0 0 1 -3.66 -4.52c2 0 3 -1 3 -2.51c0 -3.92 2.25 -7.49 7.38 -7.49c4.62 0 7.62 3.51 7.62 8a8.08 8.08 0 0 1 -3.39 6.62" />
    <path d="M10 18.69a17.29 17.29 0 0 0 3.33 .3h.54" />
    <path d="M16 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M8 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M16 9h.01" />
    <path d="M11 9h.01" />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-8 px-5 py-10 text-center mt-8 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
        {/* Sede Ciudad Vial */}
        <div className="text-center">
          <p className="text-xl font-bold text-primary mb-3">Sede Ciudad Vial</p>
          <div className="flex flex-col gap-2">
            <a
              href="https://wa.me/50671824105"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-start gap-2 bg-[#25D366] hover:bg-[#22c55e] text-white px-4 py-2 rounded-lg font-semibold text-base transition-colors shadow-sm hover:shadow-md"
              aria-label="Contactar por WhatsApp - Sede Ciudad Vial"
            >
              <WhatsAppIcon />
              <span>7182 4105</span>
            </a>
            <a
              href="https://waze.com/ul/hd1u0qu1zm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-start gap-2 bg-[#33CCFF] hover:bg-[#2BB8E6] text-white px-4 py-2 rounded-lg font-semibold text-base transition-colors shadow-sm hover:shadow-md"
              aria-label="Abrir en Waze - Sede Ciudad Vial"
            >
              <WazeIcon />
              <span>Abrir en Waze</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-24 sm:h-16 sm:w-px bg-gray-300" aria-hidden="true" />

        {/* Sede San Ramón */}
        <div className="text-center">
          <p className="text-xl font-bold text-primary mb-3">Sede San Ramón</p>
          <div className="flex flex-col gap-2">
            <a
              href="https://wa.me/506632002065"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-start gap-2 bg-[#25D366] hover:bg-[#22c55e] text-white px-4 py-2 rounded-lg font-semibold text-base transition-colors shadow-sm hover:shadow-md"
              aria-label="Contactar por WhatsApp - Sede San Ramón"
            >
              <WhatsAppIcon />
              <span>6320 0206</span>
            </a>
            <a
              href="https://waze.com/ul/hd1gcmvhkm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-start gap-2 bg-[#33CCFF] hover:bg-[#2BB8E6] text-white px-4 py-2 rounded-lg font-semibold text-base transition-colors shadow-sm hover:shadow-md"
              aria-label="Abrir en Waze - Sede San Ramón"
            >
              <WazeIcon />
              <span>Abrir en Waze</span>
            </a>
          </div>
        </div>

         {/* Divider */}
         <div className="h-px w-24 sm:h-16 sm:w-px bg-gray-300" aria-hidden="true" />


        {/* Otra Sedes */}
        <div className="text-center">
          <p className="text-xl font-bold text-primary mb-3">Otras Sedes</p>
          <div className="flex flex-col gap-2">
            <a
              href="https://wa.me/50672687202"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-start gap-2 bg-[#25D366] hover:bg-[#22c55e] text-white px-4 py-2 rounded-lg font-semibold text-base transition-colors shadow-sm hover:shadow-md"
              aria-label="Contactar por WhatsApp - Sede San Ramón"
            >
              <WhatsAppIcon />
              <span>7268-7202</span>
            </a>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-base font-normal leading-normal">
        © {new Date().getFullYear()}. All Rights Reserved.
      </p>
    </footer>
  );
};
