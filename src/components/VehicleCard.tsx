'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Calendar, Video } from 'lucide-react';
import { Vehicle } from '@/data/licenses';
import { ReservationModal } from './ReservationModal';
import { useVideoModal } from '@/contexts/VideoModalContext';

interface VehicleCardProps {
  vehicle: Vehicle;
  index: number;
  licenseType: string;
}

export const VehicleCard = ({ vehicle, index, licenseType }: VehicleCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openVideo } = useVideoModal();

  const handleVideoClick = () => {
    // Always use modal - on mobile, the HTML5 video will open in native fullscreen
    // when played, providing the native experience without page navigation
    if (vehicle.videoSrc) {
      openVideo(vehicle.videoSrc, vehicle.name);
    }
  };

  return (
    <>
      <article className="vehicle-card flex flex-col overflow-hidden text-center bg-white rounded-lg shadow-sm group">
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={vehicle.image}
            alt={`${vehicle.name} - Costa Rican driver's license vehicle`}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />

          {/* Video Badge Overlay - Only shown if vehicle has video */}
          {vehicle.videoSrc && (
            <>
              {/* Semi-transparent overlay on hover to darken image */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 pointer-events-none" />

              {/* Prominent Video Button */}
              <button
                onClick={handleVideoClick}
                className="absolute top-3 right-3 flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 z-10"
                aria-label={`Play video for ${vehicle.name}`}
              >
                <Video size={18} className="sm:w-5 sm:h-5" />
                <span className="font-semibold text-xs sm:text-sm whitespace-nowrap">Ver Video</span>
              </button>

              {/* Additional visual cue: Corner badge for extra visibility */}
              <div className="absolute top-0 left-0 w-0 h-0 border-l-[40px] sm:border-l-[50px] border-l-secondary/20 border-t-[40px] sm:border-t-[50px] border-t-secondary/20 border-r-[40px] sm:border-r-[50px] border-r-transparent border-b-[40px] sm:border-b-[50px] border-b-transparent pointer-events-none" />
            </>
          )}
        </div>
        <div className="p-4 flex flex-col gap-3">
          <div>
            <h4 className="text-lg font-bold text-primary">{vehicle.name}</h4>
            {vehicle.description && (
              <p className="text-sm text-gray-600 mt-2">{vehicle.description}</p>
            )}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors shadow-sm hover:shadow-md w-full"
          >
            <Calendar size={16} />
            <span>Reservar</span>
          </button>
        </div>
      </article>

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vehicleName={vehicle.name}
        licenseType={licenseType}
      />
    </>
  );
};
