import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mission Control | OpenClaw HQ",
  description: "Agent coordination dashboard for OpenClaw",
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: 'dark' }}>
      <body className="antialiased">
        {/* Aurora background effect */}
        <div className="aurora-bg" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
