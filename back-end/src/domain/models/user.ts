export type UserModel = {
  id: string
  name: string
  email: string
  cpf: string
  registrationNumber: string
  admin: boolean
  password: string
}

export type UserModelDto = {
  id: string
  name: string
  email: string
  cpf: string
  registrationNumber: string
  admin: boolean
  active: boolean
}
