import axios, { AxiosError } from 'axios';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        num_documento: {
          label: 'Username',
          type: 'text',
          placeholder: 'Número de Documento',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Contraseña',
        },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            num_documento: credentials?.num_documento,
            password: credentials?.password,
          });

          const user = response.data;
          //console.log("ResponseData", response.data);

          if (user.error) throw user;

          return user;
          // Manejar la respuesta aquí
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ error: string }>;
            if (axiosError.response) {
              throw axiosError.response.data;
            }
          }
          throw new Error('Unexpected error');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        ...token,
      };
      return session;
    },
    async redirect({ url, baseUrl }) {
      const redirectUrl = new URL(url, baseUrl);
      const path = redirectUrl.searchParams.get('p');
      if (path) {
        return `${baseUrl}${path}`;
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    maxAge: 3600 * 4, // 4 horas
    updateAge: 0,
  },
});

export { handler as GET, handler as POST };
