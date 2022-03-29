export interface UserType {
  id: string;
  name: string;
  email: string;
  cpf: string;
  registrationNumber: string;
  admin: boolean;
  role: string;
  accessToken?: string;
  isOnlyAdmin?: boolean;
}
