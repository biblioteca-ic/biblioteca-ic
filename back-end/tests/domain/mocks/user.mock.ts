import { UserModel, UserModelDto } from '../../../src/domain/models/user'

export const mockUserModel: UserModel = {
  id: 'any_uuid',
  name: 'any_name',
  email: 'any_email',
  cpf: '00000000000',
  registrationNumber: '12345678',
  admin: true,
  password: 'any_hashed_pass'
}

export const mockUserModelDto: UserModelDto = {
  id: 'any_uuid',
  name: 'any_name',
  email: 'any_email',
  cpf: '00000000000',
  registrationNumber: '12345678',
  admin: true,
  active: true
}
