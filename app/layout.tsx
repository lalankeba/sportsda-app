import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import NavigationBar from "@/components/navigation-bar";
import FooterBar from "@/components/footer-bar";
import "./globals.scss";

const exo2 = Exo_2({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Sports Analyzer",
  description: "Stores sportsmen data and helps statisticians to optimize talents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-bs-theme="light">
      <body className={exo2.className}>
        <div className="app">
          <header>
            <NavigationBar />
          </header>
          <main>
            {children}
          </main>
          <footer>
            <FooterBar />
          </footer>
        </div>
      </body>
    </html>
  );
}
