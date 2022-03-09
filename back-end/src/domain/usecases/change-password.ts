import { UserModelDto } from '../models/user'

export interface ChangePassword {
  change: (params: ChangePassword.Params) => Promise<UserModelDto>
}

export namespace ChangePassword {
  export type Params = {
    id: string
    oldPassword: string
    newPassword: string
  }
}
