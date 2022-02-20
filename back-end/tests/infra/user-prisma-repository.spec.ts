// Attention: Mock prisma singleton after import repository
import { prismaMock } from '../../src/infra/db/prisma/prisma-singleton'

import { UserModel } from '../../src/domain/models/user'
import { LoadUserByCpfRepository } from '../../src/data/protocols/load-user-by-cpf.repository'
import { UserPrismaRepository } from '../../src/infra/db/prisma/user-prisma-repository'

type SutTypes = {
  userPR: LoadUserByCpfRepository
}

const makeSut = (): SutTypes => {
  const userPR = new UserPrismaRepository();
  return {
    userPR,
  }
}

describe('UserPrismaRepository', () => {
  test('call loadByCpf with existing cpf', async () => {
    const { userPR } = makeSut()
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
    prismaMock.users.findFirst.mockResolvedValue(user)
    await expect(userPR.loadByCpf(user.cpf)).resolves.toEqual(user)
  })
})