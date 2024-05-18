import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Space_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";

import "./app.css";
import "@aws-amplify/ui-react/styles.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Juega pádel",
  description: "Crea partidos de pádel y encuentra compañeros de juego.",
};

export default async function RootLayout({
  auth,
  children,
}: {
  auth: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body className={spaceMono.className}>
        <ThemeProvider>
          <Providers>
            <Header />
            {children}
            {auth}
            <Footer />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
