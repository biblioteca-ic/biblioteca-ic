import { UserModelDto } from '../../models/user'

export interface EditUserData {
  edit: (params: EditUserData.Params) => Promise<UserModelDto>
}

export namespace EditUserData {
  export type Params = {
    id: string
    name?: string
    email?: string
    registrationNumber?: string
  }
}
