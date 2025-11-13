import Image from 'next/image';

export const Header = () => {
  return (
    <header className="flex items-center justify-center px-4 sm:px-6 lg:px-10 py-4">
      <div className="relative w-48 h-20 sm:w-56 sm:h-20 md:w-64 md:h-20">
        <Image
          src="/assets/logo.webp"
          alt="Licencia Costa Rica Logo"
          fill
          className="object-contain"
          priority
          unoptimized
        />
      </div>
    </header>
  );
};
