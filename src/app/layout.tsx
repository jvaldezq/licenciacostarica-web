import type {Metadata, Viewport} from "next";
import "@/styles/globals.css";
import {QueryWrapper} from "@/components/QueryWrapper";

export const metadata: Metadata = {
    title: "Licencia Costa Rica",
    description: "Plataforma administrativa para la gestión de licencias de conducir en Costa Rica",
};

export const viewport: Viewport = {
    initialScale: 1, maximumScale: 1, width: 'device-width', userScalable: false,
}


const RootLayout = ({
                        children,
                    }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (<html lang="en">
    <body
        className="h-dvh bg-white"
    >
    <QueryWrapper>
        {children}
    </QueryWrapper>
    </body>
    </html>);
}

export default RootLayout;
