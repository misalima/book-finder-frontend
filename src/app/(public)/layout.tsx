"use client";
import { Roboto } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";

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
            <div className="flex flex-col justify-between min-h-screen bg-dark-grey">
              <NavBar />
              {children}
              <Footer />
            </div>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
