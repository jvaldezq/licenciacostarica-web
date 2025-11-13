'use client';

import { LicenseClass } from '@/data/licenses';
import { LicenseTypeSection } from './LicenseTypeSection';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LicenseSectionProps {
  licenseClass: LicenseClass;
}

export const LicenseSection = ({ licenseClass }: LicenseSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    const ctx = gsap.context(() => {
      // Animate the class header
      gsap.from(header, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="license-class-section space-y-16 py-12">
      {/* Class Header */}
      <div ref={headerRef} className="flex flex-wrap items-start justify-between gap-6 px-6 py-4 border-b-4 border-secondary">
        <div className="flex items-start gap-4">
          <span className="text-6xl md:text-7xl lg:text-8xl font-black text-secondary" aria-hidden="true">
            {licenseClass.className}
          </span>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-primary uppercase">
              {licenseClass.subtitle}
            </h2>
            {licenseClass.features && licenseClass.features.length > 0 && (
              <ul className="text-gray-600 list-disc list-inside mt-3 space-y-1 text-base md:text-lg">
                {licenseClass.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* License Types */}
      <div className="space-y-20">
        {licenseClass.types.map((licenseType) => (
          <LicenseTypeSection key={licenseType.id} licenseType={licenseType} />
        ))}
      </div>
    </section>
  );
};
