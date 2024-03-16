import "~/styles/globals.css";

import "@fontsource-variable/alexandria";
import { Toaster } from "~/components/ui/sonner";

import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: {
    default: "Coffee Tracker - Dashboard",
    template: "Coffee Tracker - %s",
  },
  description: "Coffee Tracker - Dashboard",
  icons: [{ rel: "icon", url: "/icon.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
