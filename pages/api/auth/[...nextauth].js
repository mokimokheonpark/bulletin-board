import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "e4ac3067ff0e41e4c163",
      clientSecret: "87f7c86c68eac0d0aeaafdb77d7231679c05a062",
    }),
  ],
  secret: "moki123moki123",
};

export default NextAuth(authOptions);
