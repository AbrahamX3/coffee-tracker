import "@fontsource-variable/alexandria";
import { Toaster } from "~/components/ui/sonner";
import "~/styles/globals.css";

import { unstable_noStore as noStore } from "next/cache";
import { TRPCReactProvider } from "~/trpc/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  noStore();
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
