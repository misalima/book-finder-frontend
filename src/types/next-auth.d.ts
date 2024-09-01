import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    access_token: string;
    profileVisibility: number;
    createdAt: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      createdAt: string;
      profileVisibility: 0 | 1;
    };
    accessToken?: string;
  }
}
