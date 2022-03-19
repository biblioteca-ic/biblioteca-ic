import { UserModelDto } from '../models/user'

export interface CreateUserData {
  create: (params: CreateUserData.Params) => Promise<UserModelDto>
}

export namespace CreateUserData {
  export type Params = {
    name: string
    email: string
    cpf: string
    registration_number: string
    password: string
    admin: boolean
  }
}
