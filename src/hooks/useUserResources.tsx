// useUserResources.ts
'use client';

import { UserInterface } from '@/types/user-profile';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import useAxiosAuth from '@/lib/hooks/useAxiosAuth';

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
  const [, setUser] = useState<UserInterface | null>(null);
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    if (!session?.user?.token) return;

    const fetchUserResources = async () => {
      try {
        const res = await axiosAuth('/users/me');

        setUser(res.data);

        // TODO: REALIZAR UNA SOLA PETICION EN LA API PARA OBTENER LOS RECURSOS DEL USUARIO
        // const rolePromises = userData.roles.map(async (role) => {
        //   try {
        //     const roleRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/roles/id/${role.id}`);
        //     if (!roleRes.ok) {
        //       throw new Error(`Error al obtener los datos del rol ${role.id}`);
        //     }
        //     const roleData: RoleInterface = await roleRes.json();
        //     return roleData;
        //   } catch (roleError) {
        //     console.error(`Error al obtener el rol ${role.id}: `, roleError);
        //     return null; // Return null if fetching a role fails
        //   }
        // });

        // const userRoles = (await Promise.all(rolePromises)).filter((role) => role !== null) as RoleInterface[];
        // setUserRoles(userRoles);

        // const resources = userRoles.flatMap((role) => role.roleRecursos.map((recurso) => recurso.nombre_recurso));
        // setUserResources(resources);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    };

    fetchUserResources();
  }, [axiosAuth, session]);

  return;
}

export { useUserResources };
