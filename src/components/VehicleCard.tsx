import Image from 'next/image';
import { Vehicle } from '@/data/licenses';

interface VehicleCardProps {
  vehicle: Vehicle;
  index: number;
}

export const VehicleCard = ({ vehicle, index }: VehicleCardProps) => {
  return (
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
      </div>
      <div className="p-4">
        <h4 className="text-lg font-bold text-primary">{vehicle.name}</h4>
        {vehicle.description && (
          <p className="text-sm text-gray-600 mt-2">{vehicle.description}</p>
        )}
      </div>
    </article>
  );
};
