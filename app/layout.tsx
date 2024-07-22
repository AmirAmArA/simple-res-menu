import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Provider from "@/context/Provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <html lang="en">
        <body className={inter.className + " overflow-x-hidden"}>
          {children}
        </body>
      </html>
    </Provider>
  );
}
