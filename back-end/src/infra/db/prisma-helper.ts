import { PrismaClient } from '@prisma/client'
import { UserModel } from '../../domain/models/user'

export const PrismaHelper = {
  client: new PrismaClient(),
  userMapper: (prismaUser: any): UserModel => {
    const { registration_number, ...userWithoutRegistrationNumber } = prismaUser
    return Object.assign({}, userWithoutRegistrationNumber, { registrationNumber: registration_number })
  }
}
