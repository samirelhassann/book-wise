/* eslint-disable camelcase */
import { getServerSession } from "next-auth/next";
import { Nunito_Sans } from "next/font/google";

import { authOptions } from "@/lib/auth/auth";
import { LoginDialogProvider } from "@/providers/contexts/LoginDialogContext";
import { ProductDrawerProvider } from "@/providers/contexts/ProductDrawerContext";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import { SideMenuProvider } from "@/providers/SideMenuProvider";
import { SWRProvider } from "@/providers/SWRProvider";

import "./globals.css";

const nunito = Nunito_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Book Wise",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html className="text-gray-100 bg-gray-800" lang="en">
      <body className={`${nunito.className} h-[100vh]`}>
        <NextAuthProvider>
          <SWRProvider>
            <ProductDrawerProvider>
              <LoginDialogProvider>
                <SideMenuProvider session={session}>
                  {children}
                </SideMenuProvider>
              </LoginDialogProvider>
            </ProductDrawerProvider>
          </SWRProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
