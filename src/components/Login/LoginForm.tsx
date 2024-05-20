'use client';

import LogoImageLight from '@/public/images/logo.webp';
import { LockIcon, UserIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { toast as toastHot, Toaster as ToasterHot } from 'react-hot-toast';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import LoadingSpinner from '../LoadingSpinner/Loading';

const formSchema = z.object({
  num_documento: z.string().max(12, {
    message: 'El maximo de caracteres es de 12.',
  }),
  password: z.string().min(2, {
    message: 'Contraseña invalida',
  }),
});

const LoginForm = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [num_documento, setNumDocumento] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const notify = (error: string) => toastHot.error(error);

  useEffect(() => {
    notifyErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const notifyErrors = () => {
    errors.forEach((error) => {
      notify(error);
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const values = {
      num_documento,
      password,
    };

    try {
      setLoading(true);
      // Validar los valores del formulario
      const validatedValues = formSchema.parse(values);

      // Si la validación es exitosa, proceder con el inicio de sesión
      const responseNextAuth = await signIn('credentials', {
        num_documento: validatedValues.num_documento,
        password: validatedValues.password,
        redirect: false,
      });

      if (responseNextAuth?.error) {
        setErrors(responseNextAuth.error.split(','));
        setLoading(false);
        return;
      }

      // Obtener la URL solicitada original del parámetro de consulta
      const urlParams = new URLSearchParams(window.location.search);
      const requestedPage = urlParams.get('p');

      toast({
        title: 'Inicio de sesión exitoso',
      });

      // Redirigir al usuario a la página solicitada original
      if (requestedPage) {
        router.push(requestedPage);
      } else {
        router.push('/');
      }
    } catch (error) {
      // Manejar errores de validación
      if (error instanceof z.ZodError) {
        setErrors(error.issues.map((issue) => issue.message));
      } else {
        console.error('Error inesperado:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className="m-8 w-full min-w-80 max-w-sm rounded-2xl bg-white p-8 dark:bg-slate-800"
      style={{
        boxShadow: '0 0 50px 0 rgba(18, 18, 18, 0.8)',
      }}
    >
      <div className="-mt-24 mb-2 flex justify-center rounded-full">
        <Image
          alt="Logo"
          rel="preload"
          priority={true}
          className="border-6 rounded-full border-white bg-white p-1 dark:border-slate-600"
          height={170}
          src={LogoImageLight}
          style={{
            aspectRatio: '100/100',
            height: '170px',
            objectFit: 'cover',
            width: '170px',
          }}
          width={170}
        />
      </div>
      <form onSubmit={handleSubmit} className="">
        <div className="mb-2">
          <label className="mb-2 block text-lg font-semibold text-[#481500] dark:text-white" htmlFor="username">
            USUARIO
          </label>
          <div className="flex items-center rounded-lg rounded-r-md border-2 border-[#E26C00] transition-colors focus-within:border-2 focus-within:border-[#bb4802] dark:border-gray-500 dark:focus-within:border-slate-200">
            <UserIcon className="mx-3 text-gray-500" />
            <input
              className="w-full rounded-r-md p-2 leading-tight text-gray-700 focus:outline-none dark:bg-slate-800 dark:text-slate-200"
              placeholder="Numero de Documento"
              name="num_documento"
              autoComplete="username"
              value={num_documento}
              onChange={(event) => setNumDocumento(event.target.value)}
            />
          </div>
        </div>
        <div className="mb-2">
          <label className="mb-2 block text-lg font-semibold text-[#481500] dark:text-white" htmlFor="password">
            CONTRASEÑA
          </label>
          <div
            className="flex items-center rounded-lg rounded-r-md border-2 border-[#E26C00] transition-colors focus-within:border-2 focus-within:border-[#bb4802] dark:border-gray-500
            dark:focus-within:border-slate-200"
          >
            <LockIcon className="mx-3 text-gray-500" />
            <input
              className="w-full rounded-r-md p-2 leading-tight text-gray-700 focus:outline-none dark:bg-slate-800 dark:text-slate-200"
              type="password"
              placeholder="Contraseña"
              autoComplete="current-password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        <div className="mt-8 flex items-center justify-center">
          <Button loading={loading} type="submit" variant={'cabildo'}>
            Ingresar
          </Button>
        </div>
      </form>
      {errors.length > 0 && (
        <div>
          {errors.map((error) => (
            <div key={error}>
              <ToasterHot position="top-right" reverseOrder={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
