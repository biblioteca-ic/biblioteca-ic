import { UserModel, UserModelDto } from '../../../src/domain/models/user'

export const mockUserModel: UserModel = {
  id: 'any_uuid',
  name: 'any_name',
  email: 'any_email',
  cpf: '123.456.789-01',
  registration_number: '12345678',
  admin: true,
  password: 'any_hashed_pass',
  created_at: new Date,
  updated_at: new Date
}

export const mockUserModelDto: UserModelDto = {
  id: 'any_uuid',
  name: 'any_name',
  email: 'any_email',
  cpf: '123.456.789-01',
  registration_number: '12345678',
  admin: true,
  active: true
}
