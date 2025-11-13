'use client';

import { LicenseType } from '@/data/licenses';
import { VehicleCard } from './VehicleCard';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LicenseTypeSectionProps {
  licenseType: LicenseType;
}

export const LicenseTypeSection = ({ licenseType }: LicenseTypeSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const code = codeRef.current;
    const desc = descRef.current;
    const grid = gridRef.current;

    if (!section || !title || !code || !desc || !grid) return;

    const ctx = gsap.context(() => {
      // Animate title from left
      gsap.from(title, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Animate code badge
      gsap.from(code, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        delay: 0.2,
      });

      // Animate description
      gsap.from(desc, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
      });

      // Stagger vehicle cards
      const cards = grid.querySelectorAll('.vehicle-card');
      gsap.from(cards, {
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="license-type-section mb-20">
      {/* Title Section */}
      <div className="mb-8 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
          <span
            ref={codeRef}
            className="inline-block bg-secondary text-white text-lg sm:text-xl font-black px-3 py-2 sm:px-4 sm:py-2 rounded-lg self-start"
            aria-label={`License code ${licenseType.code}`}
          >
            {licenseType.code}
          </span>
          <div ref={titleRef} className="flex-1">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-primary uppercase tracking-tight leading-tight">
              {licenseType.title}
            </h3>
          </div>
        </div>
        <p ref={descRef} className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl">
          {licenseType.description}
        </p>
        {licenseType.requirements && (
          <div className="mt-4 p-3 sm:p-4 bg-yellow-50 border-l-4 border-secondary rounded">
            <p className="text-xs sm:text-sm text-gray-700">
              <span className="font-bold">Requisitos:</span> {licenseType.requirements}
            </p>
          </div>
        )}
      </div>

      {/* Vehicle Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
      >
        {licenseType.vehicles.map((vehicle, index) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
        ))}
      </div>
    </section>
  );
};
