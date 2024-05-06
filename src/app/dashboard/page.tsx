"use client";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();

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
  }

  return (
    <div>
        <h1>Dashboard</h1>
        <h2>Hola {session?.user.nombres} {session?.user.apellidos}</h2>
        <pre>
            <code>{JSON.stringify(session, null, 2)}</code>
        </pre>
        <Button onClick={getUsers}>Get Users</Button>
    </div>
  );
};
export default Dashboard;
