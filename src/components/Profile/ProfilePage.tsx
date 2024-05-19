// Interfaz para mostrar la página de perfil de usuario

import React from "react";
import { useSession } from "next-auth/react";
import { Card, CardHeader } from "@/components/ui/card";

export const ProfilePage = () => {
  const { data: session, status } = useSession();


  return (
    <div className="flex flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <h1>Página de Perfil</h1>
        </CardHeader>  
      </Card>
    </div>
  );
};
