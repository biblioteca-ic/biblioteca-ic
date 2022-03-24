import { RentedCopy } from '../../../domain/models/rented-copy'

export interface LoadRentedCopiesByBookIdRepository {
  loadByBookId: (id: string) => Promise<RentedCopy[]>
}
