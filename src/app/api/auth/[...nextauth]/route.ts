import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        num_documento: {
          label: "Username",
          type: "text",
          placeholder: "Número de Documento",
        },
        password: { 
          label: "Password", 
          type: "password", 
          placeholder: "Contraseña"
        },
      },
      async authorize(credentials, req) {
        try {
          // const res = await fetch(
          //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          //   {
          //     method: "POST",
          //     body: JSON.stringify({
          //       num_documento: credentials?.num_documento,
          //       password: credentials?.password,
          //     }),
          //     headers: { "Content-Type": "application/json" },
          //   }
          // );
          // const user = await res.json();

          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            num_documento: credentials?.num_documento,
            password: credentials?.password,
          });
      
          const user = response.data;
          console.log("ResponseData", response.data);

          if (user.error) throw user;

          return user;
          // Manejar la respuesta aquí
        } catch (error: any) {
          if (error.response) {
            console.log(error.response.data); 
            // console.log(error.response.status); 
            // console.log(error.response.headers);

            throw error.response.data;
          }
        }

        //const user = await res.json();
        //console.log("route.ts, user:", user);
        

      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});

export { handler as GET, handler as POST };
