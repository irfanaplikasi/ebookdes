import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ReduxProvider } from "@/components/redux-provider";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import TempoInit from "@/components/tempo-init"; // pastikan komponen ini ada

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EbookDes - Platform Pembaca E-book Indonesia",
  description:
    "Platform pembaca e-book terbaik di Indonesia dengan koleksi lengkap dan antarmuka yang mudah digunakan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <Script src="https://api.tempo.build/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </ReduxProvider>
        <TempoInit />
      </body>
    </html>
  );
}
