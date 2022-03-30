import { AuthenticationModel } from '../../models/authentication'

export interface Authentication {
  auth: (params: Authentication.Params) => Promise<AuthenticationModel>
}

export namespace Authentication {
  export type Params = {
    cpf: string
    password: string
  }
}
