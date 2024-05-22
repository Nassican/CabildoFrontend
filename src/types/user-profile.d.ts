export interface UserInterface {
  id_usuario: number;
  num_documento: string;
  nombres: string;
  apellidos: string;
  roles: Roles[];
  recursos: Recursos[];
}

interface Roles {
  id: number;
  name: string;
  isactive: boolean;
}

interface Recursos {
  id: number;
  name: string;
}
