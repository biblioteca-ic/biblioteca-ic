import { UserModelDto } from '../../../domain/models/user'
import { DeleteUser } from '../../../domain/usecases/users/delete-user'
import { PrismaHelper } from '../../../infra/db/prisma-helper'
import { DeleteUserRepository } from '../../protocols/users/delete-user.repository'

export class DbDeleteUser implements DeleteUser {
  constructor (private readonly _deleteUserRepository: DeleteUserRepository) { }

  async deactivate (id: string): Promise<UserModelDto> {
    const deactivatedUser = await this._deleteUserRepository.deactivate(id)
    return deactivatedUser && PrismaHelper.userDtoMapper(deactivatedUser)
  }
}
