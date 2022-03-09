import { PrismaClient } from '@prisma/client'
import { UserModel, UserModelDto } from '../../domain/models/user'

export const PrismaHelper = {
  client: new PrismaClient(),
  userMapper: (prismaUser: any): UserModel => {
    const { registration_number, ...userWithoutRegistrationNumber } = prismaUser
    return Object.assign({}, userWithoutRegistrationNumber, { registrationNumber: registration_number })
  },
  userDtoMapper: (prismaUser: any): UserModelDto => {
    const { registration_number, password, ...data } = prismaUser
    return Object.assign({}, data, { registrationNumber: registration_number })
  },
  userDbMapper: (entityUser: any): any => {
    const { registrationNumber, ...userWithoutRegistrationNumber } = entityUser
    return Object.assign({}, userWithoutRegistrationNumber, { registration_number: registrationNumber })
  }
}
