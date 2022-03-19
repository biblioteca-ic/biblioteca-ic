import { UserModelDto } from '../../models/user'

export interface ChangeAdmin {
  change: (params: ChangeAdmin.Params) => Promise<UserModelDto|null>
}

export namespace ChangeAdmin {
  export type Params = {
    id: string
    admin: boolean
  }
}
