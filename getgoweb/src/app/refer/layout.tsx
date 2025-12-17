import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Únete a GetGo - Código de Referido",
  description: "Únete a GetGo usando tu código de referido",
  viewport: "width=device-width, initial-scale=1.0",
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
};

export default function ReferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


