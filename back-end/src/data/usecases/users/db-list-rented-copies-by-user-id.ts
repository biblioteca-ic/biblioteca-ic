import { LoadRentedCopiesByUserIdRepository } from '../../../data/protocols/book_copies/load-rented-copies-by-user-id.repository'
import { RentedCopy } from '../../../domain/models/rented-copy'
import { ListRentedCopiesByUserId } from '../../../domain/usecases/users/list-rented-copies-by-user-id'

export class DbListRentedCopiesByUserId implements ListRentedCopiesByUserId {
  constructor (private readonly _loadRentedCopiesByUserIdRepository: LoadRentedCopiesByUserIdRepository) { }

  async listByUserid (id: string): Promise<RentedCopy[]> {
    const rentedCopies = await this._loadRentedCopiesByUserIdRepository.loadByUserId(id)
    return rentedCopies
  }

}