import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import LotteryContextProvider from "@/hooks/LotteryContext";


const fontSans = Plus_Jakarta_Sans({
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
        className={`antialiased gradient-bg-welcome relative min-h-screen  ${fontSans.variable}`}
      >
        <LotteryContextProvider>
          <div className="bg-[#000000a8] w-full absolute top-0 h-full -z-10"></div>
          <Header />
          {children}
        </LotteryContextProvider>
      </body>
    </html>
  );
}
