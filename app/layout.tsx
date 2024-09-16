import type { Metadata } from "next";
import { Exo_2 } from 'next/font/google'
import "./globals.scss";
import NavigationBar from "@/components/navigation-bar";

const exo2 = Exo_2({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Sports Data Analyser",
  description: "Stores sportsmen data and helps statisticians to optimize talents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={exo2.className}>
        <div className="app">
          <header>
            <NavigationBar />
          </header>
          <main>
            {children}
          </main>
          <footer>
            Footer
          </footer>
        </div>
      </body>
    </html>
  );
}
