import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    access_token?: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    };
    accessToken?: string;
  }
}
