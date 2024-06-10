import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const NEXT_AUTH = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET || "",
    callbacks: {
      session: ({ session, token, user }: any) => {
        console.log(session)
        if (session && session.user) {
          session.user.id = token.sub;
        }
        return session;
      },
    },
};
