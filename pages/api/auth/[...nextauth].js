import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { connectDB } from "@/util/database";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const client = await connectDB;
        const db = client.db("Bulletin-Board");
        const user = await db
          .collection("user")
          .findOne({ email: credentials.email });
        if (!user) {
          return null;
        }
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!pwcheck) {
          return null;
        }
        return user;
      },
    }),

    GithubProvider({
      clientId: "e4ac3067ff0e41e4c163",
      clientSecret: "87f7c86c68eac0d0aeaafdb77d7231679c05a062",
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },

  secret: "moki123moki123",
};

export default NextAuth(authOptions);
