import Image from 'next/image';
import { LicenseType } from '@/data/licenses';

interface LicenseCardProps {
  license: LicenseType;
}

export const LicenseCard = ({ license }: LicenseCardProps) => {
  return (
    <article className="flex flex-col overflow-hidden text-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative w-full aspect-[4/3]">
        <Image
          src="/assets/i10-left-removebg-preview.png"
          alt={`Costa Rican ${license.id} license vehicle`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="mt-auto pt-4 flex flex-col items-center">
        <div className="px-4 pb-4">
          <p className="text-xl font-semibold text-primary mb-2">{license.id}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{license.description}</p>
          {license.requirements && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 italic">
                <span className="font-semibold">Requisitos:</span> {license.requirements}
              </p>
            </div>
          )}
        </div>
        <div className="bg-secondary text-white py-2 px-6 w-full">
          <p className="text-lg font-bold">{license.id}</p>
        </div>
      </div>
    </article>
  );
};
