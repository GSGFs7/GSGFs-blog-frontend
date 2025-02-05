import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    // 通过后端验证
    // Credentials({
    //   name: "myself",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     const res = await fetch(
    //       `${process.env.BACKEND_URL}/api/auth/callback`,
    //       {
    //         method: "POST",
    //         headers: { "Content-type": "application/json" },
    //         body: JSON.stringify(credentials),
    //       },
    //     );
    //     const user = await res.json();

    //     if (user.error) return null;

    //     return user;
    //   },
    // }),
  ],
  callbacks: {
    // async signIn({ user, account, profile }) {
    //   try {
    //     // const existingUser
    //     return true;
    //   } catch {
    //     return false;
    //   }
    // },
  },
});
