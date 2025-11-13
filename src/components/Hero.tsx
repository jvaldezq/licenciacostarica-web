'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

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

  return (
    <section className="text-center py-16 px-4">
      <h1
        ref={titleRef}
        className="text-primary text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight"
      >
        Nuestros vehículos
      </h1>
      <p
        ref={descRef}
        className="text-gray-600 text-md md:text-lg font-normal leading-normal mx-auto mt-6"
      >
        En Licencia Costa Rica contamos con una amplia flota de vehículos modernos y en excelente estado.
        Nuestros estudiantes se preparan utilizando la misma metodología, formato y condiciones que se aplican en la prueba oficial de manejo, lo que permite llegar al examen con total seguridad y confianza. Además, realizamos simulacros de prueba práctica en un circuito idéntico al del examen real.
      </p>
    </section>
  );
};
