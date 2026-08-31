import type { Metadata } from "next";
import { Parisienne, Montserrat } from "next/font/google";
import "./globals.css";

const parisienne = Parisienne({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes", // keep variable name so we don't have to change globals.css and layout
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Santi & Kate - Nuestra Boda",
  description: "Invitación de boda de Santi y Kate",
};

// Precarga del audio para que empiece a descargarse lo antes posible
export const links = [
  { rel: "preload", href: "/music/la-boda.mp3", as: "audio", type: "audio/mpeg" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Precarga del audio — el navegador empieza a descargarlo inmediatamente */}
        <link rel="preload" href="/music/la-boda.mp3" as="audio" type="audio/mpeg" />
      </head>
      <body
        className={`${parisienne.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
