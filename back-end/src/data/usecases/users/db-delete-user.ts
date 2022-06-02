import { UserModelDto } from '../../../domain/models/user'
import { DeleteUser } from '../../../domain/usecases/users/delete-user'
import { PrismaHelper } from '../../../infra/db/prisma-helper'
import { LoadRentedCopiesByUserIdRepository } from '../../protocols/book_copies/load-rented-copies-by-user-id.repository'
import { DeleteUserRepository } from '../../protocols/users/delete-user.repository'
import { LoadUserByIdRepository } from '../../protocols/users/load-user-by-id.repository'
import { LoadUserByAdminRepository } from '../../protocols/users/load-users-by-admin.repository'
import { DeleteUserError } from '../../errors/exceptions'

export class DbDeleteUser implements DeleteUser {
  constructor (
    private readonly _loadUserByAdminRepository: LoadUserByAdminRepository,
    private readonly _loadUserByIdRepository: LoadUserByIdRepository,
    private readonly _deleteUserRepository: DeleteUserRepository,
    private readonly _loadRentedCopiesByUserIdRepository: LoadRentedCopiesByUserIdRepository
  ) { }

  async deactivate (id: string): Promise<UserModelDto | Error> {
    if (await this.userIsOnlyAdmin(id)) {
      return new DeleteUserError('Não é possível deletar este usuário, pois ele é o único admin.')
    }

    if (await this.hasRentedCopies(id)) {
      return new DeleteUserError('Nao é possivel deletar usuário pois ele possui livros emprestados.')
    }

    const deactivatedUser = await this._deleteUserRepository.deactivate(id)
    return deactivatedUser && PrismaHelper.userDtoMapper(deactivatedUser)
  }

  private async userIsOnlyAdmin (id: string): Promise<boolean> {
    const user = await this._loadUserByIdRepository.loadById(id)
    const adminUsers = await this._loadUserByAdminRepository.loadByAdmin(true)
    return ((adminUsers.length === 1) && (user.admin === true))
  }

  private async hasRentedCopies (id: string): Promise<boolean> {
    const rentedCopies = await this._loadRentedCopiesByUserIdRepository.loadByUserId(id)
    return (rentedCopies.length > 0)
  }
}
