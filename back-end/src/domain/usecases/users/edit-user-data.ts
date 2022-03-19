import { UserModelDto } from '../../models/user'

export interface EditUserData {
  edit: (params: EditUserData.Params) => Promise<UserModelDto|null>
}

export namespace EditUserData {
  export type Params = {
    id: string
    name?: string
    email?: string
    registration_number?: string
  }
}
