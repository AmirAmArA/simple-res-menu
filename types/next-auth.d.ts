import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      role: string;
      id: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;
  }

  interface JWT extends DefaultJWT {
    id: string;
    role: string;
  }
}
