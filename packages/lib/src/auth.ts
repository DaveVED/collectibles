import { NextAuthOptions, Profile, Session, User } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import type { JWT } from "next-auth/jwt";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import { getUserByEmail } from "@repo/public-db/queries";
import { InsertUser } from "@repo/public-db/schema";
import { createUser } from "@repo/public-db/inserts";

const generateRandomUsername = () => {
  return `user_${Math.random().toString(36).substr(2, 9)}`;
};

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  callbacks: {
    async jwt({ token }: { token: JWT }): Promise<JWT> {
      return token;
    },
    async session({ session }: { session: Session }): Promise<Session> {
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log(`User is ${JSON.stringify(user)}`);
      console.log(`Profile is ${JSON.stringify(profile)}`);

      if (user.email) {
        const userEmail = user.email;
        const publicUser = await getUserByEmail(userEmail);
        if (!publicUser) {
          console.log(
            `Could not find ${JSON.stringify(user)}, creating new user.`,
          );

          // todo: ensure username is not already taken.
          const username =
            profile?.collectibles_username ?? generateRandomUsername();

          const newPublicUser: InsertUser = {
            name: username,
            email: user.email,
            image: user.image,
            next_auth_id: user.id,
            bio: "",
            location: "",
          };

          const createdUser = await createUser(newPublicUser);
          console.log(`Created new public user ${JSON.stringify(createdUser)}`);
        }
      }
      return true;
    },
  },
  debug: process.env.NODE_ENV !== "production",
};

declare module "next-auth" {
  interface Profile {
    collectibles_username?: string;
  }
}
