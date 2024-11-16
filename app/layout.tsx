import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const fontSans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans"
});



export const metadata: Metadata = {
  title: "Lottery Game",
  description: "A simple lottery game built in react",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased max-w-4xl mx-auto md:px-0 px-5 ${ fontSans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
