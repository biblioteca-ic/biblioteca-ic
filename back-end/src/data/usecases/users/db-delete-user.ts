import { UserModelDto } from '../../../domain/models/user'
import { DeleteUser } from '../../../domain/usecases/users/delete-user'
import { PrismaHelper } from '../../../infra/db/prisma-helper'
import { LoadRentedCopiesByUserIdRepository } from '../../protocols/book_copies/load-rented-copies-by-user-id.repository'
import { DeleteUserRepository } from '../../protocols/users/delete-user.repository'
import { LoadUserByIdRepository } from '../../protocols/users/load-user-by-id.repository'
import { LoadUserByAdminRepository } from '../../protocols/users/load-users-by-admin.repository'

export class DbDeleteUser implements DeleteUser {
  constructor (
    private readonly _loadUserByAdminRepository: LoadUserByAdminRepository,
    private readonly _loadUserByIdRepository: LoadUserByIdRepository,
    private readonly _deleteUserRepository: DeleteUserRepository,
    private readonly _loadRentedCopiesByUserIdRepository: LoadRentedCopiesByUserIdRepository
  ) { }

  async deactivate (id: string): Promise<UserModelDto> {
    const user = await this._loadUserByIdRepository.loadById(id)
    const rentedCopies = await this._loadRentedCopiesByUserIdRepository.load(id)
    const adminUsers = await this._loadUserByAdminRepository.loadByAdmin(true)
    if (((adminUsers.length > 1) || (!user.admin)) && rentedCopies.length === 0) {
      const deactivatedUser = await this._deleteUserRepository.deactivate(id)
      return deactivatedUser && PrismaHelper.userDtoMapper(deactivatedUser)
    }
    return null
  }
}
