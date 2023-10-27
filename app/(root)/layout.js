"use client";

import LeftSideBar from "@/components/LeftSideBar";
import { Inter } from "next/font/google";
import BottomBar from "@/components/BottomSideBar";
import NextProvider from "./nextProvider";
import "../globals.css";
import TopBar from "@/components/TopBar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextProvider>
          <TopBar />
          <main className="flex flex-row">
            <LeftSideBar />
            <section className="flex min-h-screen flex-1 flex-col items-center bg-black px-6 pb-10 pt-28 max-md:pb-32 sm:px-10">
              <div className="w-full">{children}</div>
            </section>
          </main>
          <BottomBar />
        </NextProvider>
      </body>
    </html>
  );
}
