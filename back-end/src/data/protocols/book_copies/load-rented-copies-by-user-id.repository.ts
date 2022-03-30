import { RentedCopy } from '../../../domain/models/rented-copy'

export interface LoadRentedCopiesByUserIdRepository {
  loadByUserId: (id: string) => Promise<RentedCopy[]>
}
