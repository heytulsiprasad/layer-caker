import "@/app/globals.css";
import { Header } from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
