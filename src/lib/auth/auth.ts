import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import PrismaAdapter from "./prisma-adapter";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
};
