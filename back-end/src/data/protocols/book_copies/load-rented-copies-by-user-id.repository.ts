import { RentedCopy } from '../../../domain/models/rented-copy'

export interface LoadRentedCopiesByUserIdRepository {
  load: (id: string) => Promise<RentedCopy[]>
}
