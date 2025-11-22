'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/assessment', label: 'Prueba Teórica' },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <div className="relative w-32 h-10 sm:w-40 sm:h-12 md:w-44 md:h-14 transition-opacity hover:opacity-80">
            <Image
              src="/assets/logo.webp"
              alt="Licencia Costa Rica Logo"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-1 md:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-4 md:px-5 py-2 text-sm md:text-base font-medium rounded-lg transition-all duration-200',
                  'hover:bg-gray-50',
                  isActive
                    ? 'text-secondary'
                    : 'text-primary hover:text-secondary'
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-secondary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Navigation */}
        <nav className="flex sm:hidden items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 active:scale-95',
                  'hover:bg-gray-50',
                  isActive
                    ? 'text-secondary bg-gray-50'
                    : 'text-primary'
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-secondary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
