export interface UserInterface {
  id_usuario: number;
  num_documento: string;
  nombres: string;
  apellidos: string;
  roles: Roles[];
}

interface Roles {
  id: number;
  name: string;
  isactive: boolean;
}
