import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id_usuario: number;
      num_documento: string;
      nombres: string;
      apellidos: string;
      token: string;
    };
  }
}
