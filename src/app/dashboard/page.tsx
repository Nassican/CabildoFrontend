"use client";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
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

  return (
    <div>
      <h1 className="mb-4 text-lg font-bold">
        Dashboard
      </h1>
      {/* <pre>
            <code>{JSON.stringify(session, null, 2)}</code>
        </pre>*/}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Hola {session?.user.nombres} {session?.user.apellidos} 👋 </CardTitle>
          <CardDescription>Numero de usuario: {session?.user.num_documento}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Tu session expira en: {session?.expires}</p>
        </CardContent>
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
