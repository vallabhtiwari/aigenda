import { prisma } from "@/lib/db";
import { AuthCreds } from "@/lib/types";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as AuthCreds
        if (email && password) {
          const user = await prisma.user.findUnique({ where: { email } })
          if (user && user.password) {
            const verify = await bcrypt.compare(password, user.password)
            if (verify) {
              return user;
            }
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt"
  }
};
