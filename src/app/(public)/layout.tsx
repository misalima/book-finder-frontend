"use client";
import { Roboto } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@/components/Toast/ToastContext";
import VLibrasContainer from "@/components/VLibras";

const queryClient = new QueryClient();
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${roboto.className}`}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <ToastProvider>
              <div className="flex flex-col justify-between min-h-screen">
                <NavBar />
                {children}
                <Footer />
              </div>
              <VLibrasContainer />
            </ToastProvider>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}