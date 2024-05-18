// useUserResources.ts
"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export interface UserInterface {
  id_usuario: number;
  num_documento: string;
  nombres: string;
  apellidos: string;
  roles: any[];
}

export interface RoleInterface {
  id: number;
  name: string;
  roleRecursos: ResourceInterface[];
}

export interface ResourceInterface {
  id: number;
  nombre_recurso: string;
}

function useUserResources() {
  const [userResources, setUserResources] = useState<string[]>([]);
  const [userRoles, setUserRoles] = useState<RoleInterface[]>([]);
  const [user, setUser] = useState<UserInterface | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.token) return;

    const fetchUserResources = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${session.user.token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }

        const userData: UserInterface = await res.json();
        setUser(userData);

        const rolePromises = userData.roles.map(async (role) => {
          try {
            const roleRes = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/roles/id/${role.id}`
            );
            if (!roleRes.ok) {
              throw new Error(`Error al obtener los datos del rol ${role.id}`);
            }
            const roleData: RoleInterface = await roleRes.json();
            return roleData;
          } catch (roleError) {
            console.error(`Error al obtener el rol ${role.id}: `, roleError);
            return null; // Return null if fetching a role fails
          }
        });

        const userRoles = (await Promise.all(rolePromises)).filter(
          (role) => role !== null
        ) as RoleInterface[];
        setUserRoles(userRoles);

        const resources = userRoles.flatMap((role) =>
          role.roleRecursos.map((recurso) => recurso.nombre_recurso)
        );
        setUserResources(resources);
      } catch (error: any) {
        console.error(error);
        setUser(null);
      }
    };

    fetchUserResources();
  }, [session?.user?.token]);

  // Retornar los recursos del usuario sin repetir
  const userResourcesMaped = Array.from(new Set(userResources));

  return {
    userResourcesMaped,
  };
}

export { useUserResources };
