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
import ErrorCustom from "@/components/Errors/ErrorCustom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const ProfilePagePrincipal = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserInterface | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  if (error) {
    return <ErrorCustom {...{ error }} />;
  }

  return (
    <div>
      {user && (
        <div>
          <Card className="mb-4 max-w-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                Información Personal
                <Avatar className="mr-2">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </CardTitle>
              <CardDescription>
                ID: {user.id_usuario} Numero de usuario: {user.num_documento}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Nombres</Label>
                <Input type="text" id="apellido" defaultValue={user.nombres} />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Apellidos</Label>
                <Input
                  type="text"
                  id="apellido"
                  defaultValue={user.apellidos}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Número de documento</Label>
                <Input
                  disabled
                  type="text"
                  id="numDoc"
                  defaultValue={user.num_documento}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Roles</Label>
                <Accordion type="single" collapsible className="w-full border rounded-md px-3 border-input">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <Label>Ver roles</Label>
                    </AccordionTrigger>
                    <AccordionContent>
                      {user.roles.map((rol) => (
                        <div key={rol.id} className="">
                          <Label>{rol.name}</Label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProfilePagePrincipal;
