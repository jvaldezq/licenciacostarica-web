'use client';

import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { LicenseSection } from '@/components/LicenseSection';
import { Footer } from '@/components/Footer';
import { licenseClasses } from '@/data/licenses';
import { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        // Handle initial hash scroll on page load
        const handleHashScroll = () => {
            const hash = window.location.hash;
            if (hash) {
                // Remove the # from the hash
                const id = hash.replace('#', '');
                // Wait for the page to render
                setTimeout(() => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            }
        };

        // Run on mount
        handleHashScroll();

        // Also listen for hash changes (when user navigates using shared links)
        window.addEventListener('hashchange', handleHashScroll);

        return () => {
            window.removeEventListener('hashchange', handleHashScroll);
        };
    }, []);

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <div className="px-4 sm:px-6 lg:px-8 xl:px-40 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col w-full max-w-6xl flex-1">
                        <Header />

                        <main className="flex-grow">
                            <Hero />

                            <div className="px-4 space-y-16">
                                {licenseClasses.map((licenseClass) => (
                                    <LicenseSection
                                        key={licenseClass.id}
                                        licenseClass={licenseClass}
                                    />
                                ))}
                            </div>
                        </main>

                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;