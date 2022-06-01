import { UserModelDto } from '../models/user'

export interface CreateUserData {
  create: (params: CreateUserData.Params) => Promise<UserModelDto | Error>
}

export namespace CreateUserData {
  export type Params = {
    name: string
    email: string
    cpf: string
    registrationNumber: string
    password: string
    admin: boolean
  }
}
