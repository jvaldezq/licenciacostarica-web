import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { QueryWrapper } from "@/components/QueryWrapper";
import { VideoModalProvider } from "@/contexts/VideoModalContext";
import { RootVideoModal } from "@/components/RootVideoModal";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Header } from "@/components/Header";


export const metadata: Metadata = {
    title: "Licencia Costa Rica - Escuela de Manejo | Clases A, B y C",
    description: "Aprende a manejar en Costa Rica con Licencia Costa Rica. Flotilla moderna de vehículos, instructores certificados y preparación completa para examen oficial. Clases para motos, carros y buses.",
    keywords: [
        "licencia de conducir Costa Rica",
        "escuela de manejo",
        "clases de manejo",
        "examen de conducir",
        "licencia tipo A",
        "licencia tipo B",
        "licencia tipo C",
        "aprender a manejar",
        "curso de manejo",
        "clases de moto",
        "clases de carro",
        "Ciudad Vial",
        "San Ramón",
        "COSEVI",
        "prueba práctica manejo",
    ],
    authors: [{ name: "Licencia Costa Rica" }],
    creator: "Licencia Costa Rica",
    publisher: "Licencia Costa Rica",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "es_CR",
        url: "https://licenciacostarica.com",
        siteName: "Licencia Costa Rica",
        title: "Licencia Costa Rica - Escuela de Manejo Profesional",
        description: "Flotilla moderna de vehículos, instructores certificados y preparación completa para tu examen de conducir. Licencias tipo A, B, C, D y E.",
        images: [
            {
                url: "/assets/logo.webp",
                width: 1200,
                height: 630,
                alt: "Licencia Costa Rica - Escuela de Manejo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Licencia Costa Rica - Escuela de Manejo",
        description: "Aprende a manejar con los mejores. Flotilla moderna, instructores certificados y preparación completa para tu examen oficial.",
        images: ["/assets/logo.webp"],
    },
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/favicon.svg", type: "image/svg+xml" },
            { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        ],
        apple: [
            { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
    },
    manifest: "/site.webmanifest",
    alternates: {
        canonical: "https://licenciacostarica.com",
    },
    category: "education",
    verification: {
        // Add your verification tokens here when available
        // google: "your-google-verification-code",
        // yandex: "your-yandex-verification-code",
    },
};

export const viewport: Viewport = {
    initialScale: 1,
    maximumScale: 5,
    width: 'device-width',
    userScalable: true,
    themeColor: "#ffffff",
}


const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (<html lang="en">
        <body
            className="min-h-screen bg-white"
        >
            <QueryWrapper>
                <VideoModalProvider>
                    <Header />
                    {children}
                    <RootVideoModal />
                </VideoModalProvider>
            </QueryWrapper>
        </body>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
            <GoogleAnalytics
                gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}
            />
        )}
    </html>);
}

export default RootLayout;
