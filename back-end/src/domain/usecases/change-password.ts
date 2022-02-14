export interface ChangePassword {
  change: (params: ChangePassword.Params) => Promise<void>
}

export namespace ChangePassword {
  export type Params = {
    id: string
    oldPassword: string
    newPassword: string
  }
}
