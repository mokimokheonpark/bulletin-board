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
        const userDatum = await db
          .collection("user")
          .findOne({ email: credentials.email });
        if (!userDatum) {
          return null;
        }
        const pwcheck = await bcrypt.compare(
          credentials.password,
          userDatum.password
        );
        if (!pwcheck) {
          return null;
        }
        return userDatum;
      },
    }),

    GithubProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
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
        if (user.username) {
          token.user.username = user.username;
          token.user.email = user.email;
        } else {
          const index = user.email.indexOf("@");
          if (index !== -1) {
            token.user.username = user.email.slice(0, index);
          } else {
            token.user.username = "Unknown";
          }
          token.user.email = user.email + " (GitHub)";
          const client = await connectDB;
          const db = client.db("Bulletin-Board");
          const userDatum = await db
            .collection("user")
            .findOne({ email: token.user.email });
          if (!userDatum) {
            await db.collection("user").insertOne({
              username: token.user.username,
              email: token.user.email,
            });
          }
        }
      }
      return token;
    },

    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },

    redirect: async ({ url, baseUrl }) => {
      return baseUrl;
    },
  },

  secret: process.env.SECRET,
};

export default NextAuth(authOptions);
