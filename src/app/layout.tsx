import AuthProvider from "@/components/AuthProvider";
import type { Metadata, Viewport } from "next";
import "@fontsource-variable/figtree";
import "@fontsource-variable/source-serif-4";
import "./globals.css";

export const metadata: Metadata = {
  title: "Expedia Travel: Vacations, Cheap Flights, Hotel Deals & More",
  description:
    "The one place you go to go places. Search hotels, flights, cars, packages, things to do and cruises.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      {/* suppressHydrationWarning only covers <body>'s own attributes —
          some browser extensions inject attributes right after load. */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
