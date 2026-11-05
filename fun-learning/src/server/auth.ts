/**
 * Auth.js v5 setup.
 *
 * v1: Google provider only. Magic-link via Resend is stubbed below — the AI
 * module / content agent will wire it once a Resend API key exists.
 *
 * Env (see .env.example):
 *   AUTH_SECRET
 *   AUTH_GOOGLE_ID
 *   AUTH_GOOGLE_SECRET
 */

import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/server/db";

// Augment the Session to carry the Prisma user id.
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // TODO (post-scaffold): magic-link via Resend.
    // import Resend from "next-auth/providers/resend";
    // Resend({ apiKey: process.env.RESEND_API_KEY, from: "login@funlingo.app" }),
  ],
  callbacks: {
    session({ session, user }) {
      if (session.user) session.user.id = user.id;
      return session;
    },
  },
  pages: {
    signIn: "/account",
  },
});
