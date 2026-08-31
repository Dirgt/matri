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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${parisienne.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
