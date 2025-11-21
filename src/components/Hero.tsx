'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { PromoSection } from './PromoSection';

export const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const desc = descRef.current;
    if (!title || !desc) return;

    const ctx = gsap.context(() => {
      // Simple fade in animation for title
      gsap.from(title, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      });

      // Animate description
      gsap.from(desc, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  const handleReglamentoClick = () => {
    window.open('/assets/ReglamentoEvaluacion.pdf', '_blank');
  };

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Column - Vehicles Info */}
        <div className="text-center lg:text-left space-y-6">
          <h1
            ref={titleRef}
            className="text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight"
          >
            Nuestros vehículos
          </h1>
          <p
            ref={descRef}
            className="text-gray-600 text-sm md:text-base lg:text-lg font-normal leading-relaxed"
          >
            En Licencia Costa Rica contamos con una amplia flotilla de vehículos modernos y en excelente estado.
            Nuestros clientes se preparan utilizando la misma metodología, formato y condiciones que se aplican en la prueba oficial de manejo (
            <button
              onClick={handleReglamentoClick}
              className="text-secondary hover:text-secondary/80 font-semibold underline decoration-secondary/50 hover:decoration-secondary underline-offset-2 transition-colors inline-flex items-center"
              aria-label="Ver Reglamento de Evaluación"
            >
              Ver Reglamento de Evaluación
            </button>
            ), lo que permite llegar al examen con total seguridad y confianza. Además, realizamos simulacros de prueba práctica en un circuito idéntico al del examen real.
          </p>
        </div>

        {/* Right Column - Promo Section */}
        <div className="flex items-center justify-center">
          <PromoSection />
        </div>
      </div>
    </section>
  );
};
