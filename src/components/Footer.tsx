export const Footer = () => {
  return (
    <footer className="flex flex-col gap-8 px-5 py-10 text-center mt-8 border-t border-gray-200">
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        <div className="text-center">
          <p className="text-gray-600 text-sm">WhatsApp</p>
          <p className="text-xl font-bold text-primary">7182 4105</p>
        </div>
        <div className="h-10 w-px bg-gray-300 hidden sm:block" aria-hidden="true" />
        <div className="text-center">
          <p className="text-xl font-bold text-primary">Sede Ciudad Vial</p>
          <p className="text-xl font-bold text-primary">Sede San Ramón</p>
        </div>
      </div>
      <p className="text-gray-600 text-base font-normal leading-normal">
        © {new Date().getFullYear()}. All Rights Reserved.
      </p>
    </footer>
  );
};
