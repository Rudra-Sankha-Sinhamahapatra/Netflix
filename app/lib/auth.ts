import db from "@/db";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from "next-auth";


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "aaron@agmail.com", required: true },
        password: { label: "Password", type: "password", placeholder: "Tsunami567$#", required: true },
        name: { label: "Name", type: "text", placeholder: "Aaron", required: false }
      },
      async authorize(credentials: any) {
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        const existingUser = await db.user.findFirst({
          where: { email: credentials.email }
        });

        if (existingUser) {
          if (existingUser.password) {
            const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
            if (passwordValidation) {
              return {
                id: existingUser.id.toString(),
                name: existingUser.name,
                email: existingUser.email
              };
            } else {
              alert("Incorrect Password")
              throw new Error('Incorrect password. Please try again.');
            }
          } else {
            throw new Error('Password not set. Please reset your password.');
          }
        } else {
          try {
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const newUser = await db.user.create({
              data: {
                email: credentials.email,
                password: hashedPassword,
                name: credentials.name || null
              }
            });

            return {
              id: newUser.id.toString(),
              name: newUser.name,
              email: newUser.email
            };
          } catch (e) {
            console.error(e);
            throw new Error('User creation failed. Please try again.');
          }
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || ""
    })
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    }
  }
};

// Export NextAuth options for API route handler
export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);
