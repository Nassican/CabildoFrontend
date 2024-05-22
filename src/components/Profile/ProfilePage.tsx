'use client';

// import { useUserResources } from '@/hooks/useUserResources';
import { UserInterface } from '@/types/user-profile';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

import ErrorCustom from '@/components/Errors/ErrorCustom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import useAxiosAuth from '@/lib/hooks/useAxiosAuth';

import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const ProfilePagePrincipal = () => {
  const { status } = useSession();
  const [user, setUser] = useState<UserInterface | null>(null);
  const [error, setError] = useState<string | null>(null);
  const axiosAuth = useAxiosAuth();
  // const userResourcers = useUserResources();

  useEffect(() => {
    const fetchUser = async () => {
      if (status === 'loading') {
        return;
      }

      try {
        const res = await axiosAuth.get('/users/me');
        setUser(res.data);
        console.log('res', res.data);
        setError(null);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ error: string }>;
          if (axiosError.response) {
            throw axiosError.response.data;
          }
        }
        throw new Error('Unexpected error');
      }
    };

    fetchUser();
  }, [axiosAuth, status]);

  if (status === 'loading') {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <ErrorCustom {...{ error }} />;
  }

  // console.log('user', userResourcers);

  return (
    <div>
      {user && (
        <div>
          <Card className="mb-4 max-w-sm">
            <CardHeader>
              <CardTitle className="flex items-center">Información Personal</CardTitle>
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
                <Input type="text" id="apellido" defaultValue={user.apellidos} />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Número de documento</Label>
                <Input disabled type="text" id="numDoc" defaultValue={user.num_documento} />
              </div>
              <div className="flex flex-col gap-4">
                <Label>Roles</Label>
                <div className="flex flex-wrap gap-2">
                  {user.roles.map((rol) => (
                    <Badge key={rol.id} className="capitalize">
                      {rol.name}
                    </Badge>
                  ))}
                </div>
                <Label>Recursos</Label>
                <div className="flex flex-wrap gap-2">
                  {user.recursos.map((recursos) => (
                    <Badge key={recursos.id} className="capitalize">
                      {recursos.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProfilePagePrincipal;
