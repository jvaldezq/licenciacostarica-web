'use client';

import { LicenseType } from '@/data/licenses';
import { VehicleCard } from './VehicleCard';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Share2 } from 'lucide-react';

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
  const [isSharing, setIsSharing] = useState(false);

  // Generate a URL-friendly ID from the license code
  const sectionId = `licencia-${licenseType.code.toLowerCase()}`;

  const handleShare = async () => {
    setIsSharing(true);

    const shareUrl = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    const shareData = {
      title: `${licenseType.code} - ${licenseType.title}`,
      text: licenseType.description,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copiado al portapapeles');
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
    } finally {
      setIsSharing(false);
    }
  };

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
    <section ref={sectionRef} id={sectionId} className="license-type-section mb-20 scroll-mt-24">
      {/* Title Section */}
      <div className="mb-6 sm:mb-8 px-4">
        {/* Top row: Code badge and Share button */}
        <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
          <span
            ref={codeRef}
            className="inline-block bg-secondary text-white text-base sm:text-lg md:text-xl font-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg"
            aria-label={`License code ${licenseType.code}`}
          >
            {licenseType.code}
          </span>
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="bg-primary hover:bg-secondary text-white p-2.5 sm:p-3 rounded-lg transition-colors duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            aria-label="Compartir esta sección"
            title="Compartir"
          >
            <Share2 size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Title */}
        <div ref={titleRef} className="mb-3 sm:mb-4">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-primary uppercase tracking-tight leading-tight">
            {licenseType.title}
          </h3>
        </div>

        {/* Description */}
        <p ref={descRef} className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-4xl">
          {licenseType.description}
        </p>
      </div>

      {/* Vehicle Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
      >
        {licenseType.vehicles.map((vehicle, index) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            index={index}
            licenseType={licenseType.code}
          />
        ))}
      </div>
    </section>
  );
};
