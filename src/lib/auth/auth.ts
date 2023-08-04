/* eslint-disable no-param-reassign */
import { NextAuthOptions, Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import PrismaAdapter from "./prisma-adapter";

interface SessionProps {
  session: Session;
  user: AdapterUser;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],

  callbacks: {
    session: async ({ session, user }: SessionProps) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};
