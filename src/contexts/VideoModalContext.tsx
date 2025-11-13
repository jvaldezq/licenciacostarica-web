'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface VideoModalContextType {
  isOpen: boolean;
  videoSrc: string | null;
  vehicleName: string | null;
  openVideo: (videoSrc: string, vehicleName: string) => void;
  closeVideo: () => void;
}

const VideoModalContext = createContext<VideoModalContextType | undefined>(undefined);

export const VideoModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [vehicleName, setVehicleName] = useState<string | null>(null);

  const openVideo = (src: string, name: string) => {
    setVideoSrc(src);
    setVehicleName(name);
    setIsOpen(true);
  };

  const closeVideo = () => {
    setIsOpen(false);
    // Delay clearing the src to allow exit animation
    setTimeout(() => {
      setVideoSrc(null);
      setVehicleName(null);
    }, 300);
  };

  return (
    <VideoModalContext.Provider value={{ isOpen, videoSrc, vehicleName, openVideo, closeVideo }}>
      {children}
    </VideoModalContext.Provider>
  );
};

export const useVideoModal = () => {
  const context = useContext(VideoModalContext);
  if (!context) {
    throw new Error('useVideoModal must be used within a VideoModalProvider');
  }
  return context;
};
