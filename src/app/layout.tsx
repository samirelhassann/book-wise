/* eslint-disable camelcase */
import { Nunito_Sans } from "next/font/google";

import "./globals.css";

import { NextAuthProvider, SideMenuProvider } from "./providers";

const nunito = Nunito_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Book Wise",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="text-gray-100 bg-gray-800" lang="en">
      <body className={nunito.className}>
        <NextAuthProvider>
          <SideMenuProvider>{children}</SideMenuProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
