import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { ConvexClientProvider, LoadingSpinner, Providers } from "@/components";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Ticket Hub",
  description:
    "A Ticket Marketplace Platform where people can buy or sell tickets.",
};

export const viewport: Viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari, credit to https://github.com/ai-ng
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn(
        roboto.variable,
        "min-h-screen overflow-x-hidden antialiased"
      )}
    >
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="TicketHub" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={cn(roboto.className, "antialiased")}>
        <ConvexClientProvider>
          <ClerkProvider
            appearance={{
              baseTheme: dark,
              elements: {
                footer: {
                  display: "none",
                },
              },
              layout: {
                unsafe_disableDevelopmentModeWarnings: true,
              },
            }}
          >
            <ClerkLoading>
              <div className="flex items-center justify-center h-screen">
                <LoadingSpinner variant="infinite" />
              </div>
            </ClerkLoading>
            <ClerkLoaded>
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-screen">
                    <LoadingSpinner variant="bars" />
                  </div>
                }
              >
                <main className="flex flex-col relative">
                  <Providers>{children}</Providers>
                  <Toaster richColors />
                </main>
              </Suspense>
            </ClerkLoaded>
          </ClerkProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
