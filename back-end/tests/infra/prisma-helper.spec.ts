import { UserModel } from '../../src/domain/models/user'
import { PrismaHelper } from '../../src/infra/db/prisma/prisma-helper'

describe('PrismaHelper', () => {
  test('call userMapper with correct values', async () => {
    const user: UserModel = {
      id: 'any_uuid',
      name: 'any_name',
      email: 'user.student@ic.ufal.br',
      password: 'any_password',
      registration_number: '21112900',
      cpf: '123.456.789-09',
      admin: false,
      created_at: new Date,
      updated_at: new Date()
    }
    await expect(PrismaHelper.userMapper(user as any)).toEqual(user)
  })
})