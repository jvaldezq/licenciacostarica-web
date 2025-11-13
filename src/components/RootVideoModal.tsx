'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useVideoModal } from '@/contexts/VideoModalContext';

export const RootVideoModal = () => {
  const { isOpen, videoSrc, vehicleName, closeVideo } = useVideoModal();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeVideo();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeVideo]);

  if (!isOpen || !videoSrc) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4"
      onClick={closeVideo}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: '90vh',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{vehicleName}</h3>
          <button
            onClick={closeVideo}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close video"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative w-full bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            style={{ maxHeight: 'calc(90vh - 73px)' }}
            controls
            controlsList="nodownload"
            preload="metadata"
          >
            <source src={videoSrc} type="video/quicktime" />
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};
