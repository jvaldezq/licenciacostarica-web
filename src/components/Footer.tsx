export const Footer = () => {
  return (
    <footer className="flex flex-col gap-8 px-5 py-10 text-center mt-8 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
        {/* Sede Ciudad Vial */}
        <div className="text-center">
          <p className="text-xl font-bold text-primary mb-2">Sede Ciudad Vial</p>
          <div className="flex flex-col gap-1">
            <p className="text-gray-600 text-sm">WhatsApp</p>
            <a
              href="https://wa.me/50671824105"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-bold text-primary hover:text-secondary transition-colors"
            >
              7182 4105
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-24 sm:h-16 sm:w-px bg-gray-300" aria-hidden="true" />

        {/* Sede San Ramón */}
        <div className="text-center">
          <p className="text-xl font-bold text-primary mb-2">Sede San Ramón</p>
          <div className="flex flex-col gap-1">
            <p className="text-gray-600 text-sm">WhatsApp</p>
            <a
              href="https://wa.me/50671824105"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-bold text-primary hover:text-secondary transition-colors"
            >
              7182 4105
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
