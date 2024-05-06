"use client";

import React, { useEffect } from "react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

import ProfileForm from "./components/Login";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Component from "./components/Login";
import Image from "next/image";

import LogoImage from "./media/logo_cabildo.svg";
import './styles/style.css';

const formSchema = z.object({
  num_documento: z.string().max(12, {
    message: "El maximo de caracteres es de 12.",
  }),
  password: z.string().min(2, {
    message: "Contraseña invalida",
  }),
});

const LoginPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [num_documento, setNumDocumento] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const notify = (error: string) => toast.error(error);

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
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      // Manejar errores de validación
      if (error instanceof z.ZodError) {
        setErrors(error.issues.map((issue) => issue.message));
      } else {
        console.error("Error inesperado:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-[#FF9505] to-[#BB4802] min-h-screen">
      <div className="dark:bg-white w-full max-w-sm p-8 bg-white rounded-2xl"
        style={{
          boxShadow: '0 0 50px 0 rgba(239, 68, 68, 0.3)',
        }}>
        <div className="flex justify-center -mt-24 mb-2">
          <Image
            alt="Logo"
            className="rounded-full border-4 border-white"
            height={150}
            src={LogoImage}
            style={{
              aspectRatio: "100/100",
              height: "150px",
              objectFit: "cover",
              width: "150px",
            }}
            width={150}
          />
        </div>
        <form onSubmit={handleSubmit} className="">
          <div className="mb-2 bg-white">
            <label
              className="block text-lg font-semibold text-[#481500] mb-2"
              htmlFor="username"
            >
              USUARIO
            </label>
            <div className="flex items-center border-2 border-[#E26C00] rounded-lg rounded-r-md focus-within:border-[#bb4802] focus-within:border-2 transition-colors">
              <UserIcon className="mx-3 text-gray-500" />
              <input
                required
                className="w-full p-2 text-gray-700 leading-tight focus:outline-none rounded-r-md"
                placeholder="Numero de Documento"
                name="num_documento"
                value={num_documento}
                onChange={(event) => setNumDocumento(event.target.value)}
              />
            </div>
          </div>
          <div className="mb-2">
            <label
              className="block text-lg font-semibold text-[#481500] mb-2"
              htmlFor="password"
            >
              CONTRASEÑA
            </label>
            <div className="flex items-center border-2 border-[#E26C00] rounded-lg rounded-r-md focus-within:border-[#bb4802] focus-within:border-2 transition-colors">
              <LockIcon className="mx-3 text-gray-500" />
              <input
                required
                className="w-full p-2 text-gray-700 leading-tight focus:outline-none rounded-r-md"
                type="password"
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-8">
            <Button
              type="submit"
              className="w-full  text-lg bg-[#FF9505] hover:bg-[#e26c00] text-[#481500] font-bold py-2 px-4 rounded-lg"
            >
              Ingresar
            </Button>
          </div>
        </form>
        {errors.length > 0 && (
          <div>
            {errors.map((error) => (
              <div key={error}>
                <Toaster position="top-right" reverseOrder={false} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

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
