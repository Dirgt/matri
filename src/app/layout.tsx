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
  metadataBase: new URL("https://bodask.vercel.app"),
  title: "Santi & Kate - ¡Nos Casamos! 💍",
  description: "Te invitamos a celebrar nuestra boda este Domingo 25 de Octubre de 2026 en Chinauta. Toca aquí para ver los detalles y confirmar tu asistencia.",
  openGraph: {
    title: "Santi & Kate - ¡Nuestra Boda! 💍",
    description: "Te invitamos a celebrar nuestra boda este Domingo 25 de Octubre de 2026. Toca para ver todos los detalles y confirmar tu asistencia.",
    url: "https://bodask.vercel.app",
    siteName: "Boda Santi & Kate",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Santi & Kate - Nuestra Boda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Santi & Kate - ¡Nuestra Boda! 💍",
    description: "Te invitamos a celebrar nuestra boda este Domingo 25 de Octubre de 2026 en Chinauta.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
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
