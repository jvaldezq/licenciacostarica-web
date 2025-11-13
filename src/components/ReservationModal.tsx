'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleName: string;
  licenseType: string;
}

const SEDE_OPTIONS = [
  'Liberia',
  'Nicoya',
  'San Carlos',
  'San Ramón',
  'Puntarenas',
  'Alajuela',
  'Heredia',
  'Ciudad Vial',
  'Cartago',
  'Guapiles',
  'Limon',
  'Perez Zeledon',
  'Rio Claro',
];

const getPhoneNumber = (sede: string): string => {
  if (sede === 'San Ramón') return '50663200206';
  if (sede === 'Ciudad Vial') return '50671824105';
  return '50672687202';
};

export const ReservationModal = ({
  isOpen,
  onClose,
  vehicleName,
  licenseType
}: ReservationModalProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    location: '',
    testDate: '',
    testTime: '',
  });

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== '' &&
      formData.idNumber.trim() !== '' &&
      formData.location !== '' &&
      formData.testDate !== '' &&
      formData.testTime !== ''
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const phoneNumber = getPhoneNumber(formData.location);

    const message = `Hola, me gustaría hacer una reserva:

*Nombre completo:* ${formData.fullName}
*Número de cédula:* ${formData.idNumber}
*Tipo de licencia:* ${licenseType}
*Vehículo:* ${vehicleName}
*Sede:* ${formData.location}
*Fecha de prueba:* ${formData.testDate}
*Hora de prueba:* ${formData.testTime}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    onClose();

    // Reset form
    setFormData({
      fullName: '',
      idNumber: '',
      location: '',
      testDate: '',
      testTime: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto z-50">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-2xl font-bold text-primary">
              Reservar
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                aria-label="Cerrar"
              >
                <X size={24} />
              </button>
            </Dialog.Close>
          </div>

          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Vehículo seleccionado:</p>
            <p className="font-semibold text-primary">{vehicleName}</p>
            <p className="text-sm text-gray-600 mt-1">Tipo de licencia:</p>
            <p className="font-semibold text-primary">{licenseType}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-1">
                Nombre completo *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Juan Pérez"
              />
            </div>

            <div>
              <label htmlFor="idNumber" className="block text-sm font-semibold text-gray-700 mb-1">
                Número de cédula *
              </label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="1-2345-6789"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-1">
                Sede *
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white"
              >
                <option value="">Seleccione una sede</option>
                {SEDE_OPTIONS.map((sede) => (
                  <option key={sede} value={sede}>
                    {sede}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="testDate" className="block text-sm font-semibold text-gray-700 mb-1">
                Fecha de prueba *
              </label>
              <input
                type="date"
                id="testDate"
                name="testDate"
                value={formData.testDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="testTime" className="block text-sm font-semibold text-gray-700 mb-1">
                Hora de prueba *
              </label>
              <input
                type="time"
                id="testTime"
                name="testTime"
                value={formData.testTime}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!isFormValid()}
                className="flex-1 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-secondary"
              >
                Enviar
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
