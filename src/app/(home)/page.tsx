'use client';

import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import TimeRemaining from '@/components/Utils/TimeRemaining';

import useAxiosAuth from '@/lib/hooks/useAxiosAuth';

interface User {
  id_usuario: number;
  nombres: string;
  apellidos: string;
  num_documento: string;
}

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const axiosAuth = useAxiosAuth();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  const getUsers = async () => {
    try {
      const res = await axiosAuth.get('/users');
      //console.log('users', res.data);

      setUsers(res.data);
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

  return (
    <div>
      {/* <pre>
            <code>{JSON.stringify(session, null, 2)}</code>
        </pre>*/}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>
            Hola {session?.user.nombres} {session?.user.apellidos} 👋{' '}
          </CardTitle>
          <CardDescription>Numero de usuario: {session?.user.num_documento}</CardDescription>
        </CardHeader>
        <CardContent>
          <TimeRemaining />
        </CardContent>
        <CardFooter>
          <Button onClick={getUsers}>Get Users</Button>
        </CardFooter>
      </Card>
      {users.length > 0 && (
        <>
          {users.map((user: User) => (
            <Card key={user.id_usuario} className="mb-4">
              <CardContent>
                {user.id_usuario}: {user.nombres} {user.apellidos} - NumDoc: {user.num_documento}
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};
export default Dashboard;
