'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FileText, Download, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PromoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [hasPlayedConfetti, setHasPlayedConfetti] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const icon = iconRef.current;
    if (!container || !icon) return;

    const ctx = gsap.context(() => {
      // Animate container
      gsap.from(container, {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
      });

      // Floating animation for the trophy icon
      gsap.to(icon, {
        y: -10,
        duration: 2,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasPlayedConfetti) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayedConfetti) {
            // Trigger confetti with app colors
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#ca0b10', '#383836', '#ffffff'],
              ticks: 200,
              gravity: 1,
              scalar: 0.8,
            });
            setHasPlayedConfetti(true);
          }
        });
      },
      { threshold: 1.0 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [hasPlayedConfetti]);

  const handleDownloadPDF = () => {
    // Open PDF in new tab for viewing
    window.open('/assets/REGLAMENTO SORTEO HONDA NAVI.pdf', '_blank');
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-br from-secondary/5 via-white to-secondary/10 rounded-2xl shadow-lg border-2 border-secondary/20 p-6 md:p-8"
    >
      {/* Decorative Background Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-0" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        {/* Animated Icon */}
        <div ref={iconRef} className="relative">
          <div className="absolute inset-0 bg-secondary/20 rounded-full blur-xl animate-pulse" />
          <div className="relative bg-gradient-to-br from-secondary to-secondary/80 p-4 rounded-2xl shadow-xl">
            <Trophy size={48} className="text-white" strokeWidth={2} />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-black text-primary leading-tight">
            Sorteo Honda Navi
          </h2>
          <p className="text-lg md:text-xl font-semibold text-secondary">
            ¡Participa y gana!
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm md:text-base max-w-md leading-relaxed">
          Conoce todos los detalles, términos y condiciones de nuestro sorteo exclusivo.
          Descarga el reglamento oficial y descubre cómo participar.
        </p>

        {/* CTA Button */}
        <button
          onClick={handleDownloadPDF}
          className="group relative inline-flex items-center gap-3 bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-100"
        >
          <FileText size={24} className="group-hover:rotate-12 transition-transform duration-300" />
          <span>Ver Reglamento</span>
          <Download size={20} className="group-hover:translate-y-1 transition-transform duration-300" />
        </button>

        {/* Additional Info */}
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
          <span className="font-medium">Documento oficial en formato PDF</span>
        </div>
      </div>
    </section>
  );
};
