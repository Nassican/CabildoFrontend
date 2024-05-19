"use client";

import React, { useEffect } from "react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "next-themes";

import { toast as toastHot, Toaster as ToasterHot } from "react-hot-toast";

import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Image from "next/image";

import LogoImageLight from "@/public/images/logo.webp";

const formSchema = z.object({
  num_documento: z.string().max(12, {
    message: "El maximo de caracteres es de 12.",
  }),
  password: z.string().min(2, {
    message: "Contraseña invalida",
  }),
});

const LoginForm = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [num_documento, setNumDocumento] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  
  const notify = (error: string) => toastHot.error(error);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      num_documento: "",
      password: "",
    },
  });

  useEffect(() => {
    notifyErrors();
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
      const responseNextAuth = await signIn("credentials", {
        num_documento: validatedValues.num_documento,
        password: validatedValues.password,
        redirect: false,
      });

      if (responseNextAuth?.error) {
        setErrors(responseNextAuth.error.split(","));
        setLoading(false);
        return;
      }

      toast({
        title: "Inicio de sesión exitoso",
      });
      router.push("/dashboard");
    } catch (error) {
      // Manejar errores de validación
      if (error instanceof z.ZodError) {
        setErrors(error.issues.map((issue) => issue.message));
      } else {
        console.error("Error inesperado:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="dark:bg-slate-800 w-full max-w-sm min-w-80 p-8 m-8 bg-white rounded-2xl"
      style={{
        boxShadow: "0 0 50px 0 rgba(18, 18, 18, 0.8)",
      }}
    >
      <div className="flex justify-center -mt-24 mb-2 rounded-full">
          <Image
            alt="Logo"
            rel="preload"
            priority={true}
            className="rounded-full border-6 border-white dark:border-slate-600 bg-white p-1"
            height={170}
            src={LogoImageLight}
            style={{
              aspectRatio: "100/100",
              height: "170px",
              objectFit: "cover",
              width: "170px",
            }}
            width={170}
          />
      </div>
      <form onSubmit={handleSubmit} className="">
        <div className="mb-2">
          <label
            className="block text-lg font-semibold text-[#481500] mb-2 dark:text-white"
            htmlFor="username"
          >
            USUARIO
          </label>
          <div className="flex items-center border-2 border-[#E26C00] rounded-lg rounded-r-md focus-within:border-[#bb4802] focus-within:border-2 transition-colors dark:focus-within:border-slate-200 dark:border-gray-500">
            <UserIcon className="mx-3 text-gray-500" />
            <input
              className="w-full p-2 dark:bg-slate-800 text-gray-700 leading-tight focus:outline-none rounded-r-md dark:text-slate-200"
              placeholder="Numero de Documento"
              name="num_documento"
              autoComplete="username"
              value={num_documento}
              onChange={(event) => setNumDocumento(event.target.value)}
            />
          </div>
        </div>
        <div className="mb-2">
          <label
            className="block text-lg font-semibold text-[#481500] mb-2 dark:text-white"
            htmlFor="password"
          >
            CONTRASEÑA
          </label>
          <div
            className="flex items-center border-2 border-[#E26C00] rounded-lg rounded-r-md focus-within:border-[#bb4802] focus-within:border-2 transition-colors dark:focus-within:border-slate-200
            dark:border-gray-500"
          >
            <LockIcon className="mx-3 text-gray-500" />
            <input
              className="w-full p-2 dark:bg-slate-800 text-gray-700 leading-tight focus:outline-none rounded-r-md dark:text-slate-200"
              type="password"
              placeholder="Contraseña"
              autoComplete="current-password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-center mt-8">
          <Button loading={loading} type="submit" variant={"cabildo"}>
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

function LockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
