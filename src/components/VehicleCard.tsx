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
      <article className="vehicle-card flex flex-col overflow-hidden text-center bg-white rounded-lg shadow-sm">
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={vehicle.image}
            alt={`${vehicle.name} - Costa Rican driver's license vehicle`}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />

          {/* Video Icon Overlay - Only shown if vehicle has video */}
          {vehicle.videoSrc && (
            <button
              onClick={handleVideoClick}
              className="absolute bottom-2 right-2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-lg transition-all shadow-lg hover:shadow-xl"
              aria-label={`Play video for ${vehicle.name}`}
            >
              <Video size={20} />
            </button>
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
