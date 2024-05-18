"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserInterface } from "@/types/user-profile";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TriangleAlertIcon } from "lucide-react";
import { useUserResources } from "@/hooks/useUserResources";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserInterface | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { userResourcesMaped } = useUserResources();

  useEffect(() => {
    const fetchUser = async () => {
      if (status === "loading") {
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${session?.user?.token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }

        const userData = await res.json();
        setUser(userData);
        setError(null);
      } catch (error: any) {
        console.error(error);
        setError(error.message); // Establecer el mensaje de error en el estado
        setUser(null); // Restablecer el usuario a null en caso de error
      }
    };

    fetchUser();
  }, [session, status]);

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  console.log(userResourcesMaped);

  //TODO ARREGLAR PAGINA CUANDO NO SE ENCUENTRA EL USUARIO/ERROR AL OBTENER DATOS/EL USUARIO NO TIENE PERMISOS
  //TODO: PASAR PAGINA DE ERROR A COMPONENTE CON PROPS
  if (error) {
    return (
      <div className="flex flex-col py-10 items-center justify-center">
        <div className="bg-red-100 dark:bg-red-900 rounded-lg p-8 text-center max-w-md w-full">
          <div className="flex items-center justify-center mb-4">
            <TriangleAlertIcon className="h-10 w-10 text-red-500 dark:text-red-400" />
          </div>
          <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-2">
            Oops, algo salió mal!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Página de Perfil</h1>
      {user && (
        <div>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Avatar className="mr-2">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                Hola {user.nombres} {user.apellidos} 👋{" "}
              </CardTitle>
              <CardDescription>
                ID: {user.id_usuario} Numero de usuario: {user.num_documento}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Card className="p-4">
                <CardTitle>Roles</CardTitle>
                {user.roles.map((rol) => (
                  <CardDescription key={rol.id}>
                    ID: {rol.id} Nombre: {rol.name}
                  </CardDescription>
                ))}
              </Card>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recursos</CardTitle>
            </CardHeader>
            <CardContent>
              <div>{userResourcesMaped}</div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
