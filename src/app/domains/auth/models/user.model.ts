export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface User {
  id: number;
  email: string;
  username: string;
  roles: Role[];
}
