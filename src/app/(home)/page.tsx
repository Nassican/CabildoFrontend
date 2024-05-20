"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TimeRemaining from '../../components/Utils/TimeRemaining';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const getUsers = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });
    const users = await res.json();
    console.log("users", users);

    setUsers(users);
  };


  // mostrar session expires en formato de fecha y hora local
  const sessionDate: string = session ? session.expires : "";

  const getLocalTime = () => {
    const localTime = new Date(sessionDate);
    return localTime;
  };

  console.log("session",  session);

  return (
    <div>
      {/* <pre>
            <code>{JSON.stringify(session, null, 2)}</code>
        </pre>*/}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>
            Hola {session?.user.nombres} {session?.user.apellidos} 👋{" "}
          </CardTitle>
          <CardDescription>
            Numero de usuario: {session?.user.num_documento}
          </CardDescription>
        </CardHeader>
        <CardContent><TimeRemaining/></CardContent>
        <CardFooter>
          <Button onClick={getUsers}>Get Users</Button>
        </CardFooter>
      </Card>
      {users.length > 0 && (
        <>
          {users.map((user: any) => (
            <Card key={user.id_usuario} className="mb-4">
              <CardContent>
                {user.id_usuario}: {user.nombres} {user.apellidos} - NumDoc:{" "}
                {user.num_documento}
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};
export default Dashboard;
