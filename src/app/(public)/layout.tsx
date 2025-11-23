"use client";
import { Roboto } from "next/font/google";
// @ts-ignore: side-effect import of global CSS (type declaration for '*.css' can be added separately)
import "../globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@/components/Toast/ToastContext";

const queryClient = new QueryClient();
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>BookFinder</title>
      <meta
        name="description"
        content="Encontre sua próxima leitura no BookFinder"
      />
      <body className={roboto.className}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <ToastProvider>
              <div className="flex flex-col justify-between min-h-screen">
                <NavBar />
                {children}
                <Footer />
              </div>
            </ToastProvider>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
