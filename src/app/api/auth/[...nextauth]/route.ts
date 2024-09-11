import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "passord", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/app/user/auth/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          const { user, access_token } = response.data;

          if (user && access_token) {
            // Return the user object in the format NextAuth expects
            return {
              id: user.id,
              name: user.username, // 'name' is a standard field used by NextAuth
              email: user.email,
              profileVisibility: user.profile_visibility,
              createdAt: user.created_at,
              access_token: access_token, // Keep the access token for JWT purposes
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, //2 hours
  },
  jwt: {
    maxAge: 2 * 60 * 60, // 2 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.profileVisibility = user.profileVisibility;
        token.createdAt = user.createdAt;
        token.accessToken = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.createdAt = token.createdAt as string;
        session.user.profileVisibility = token.profileVisibility as 0 | 1;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
