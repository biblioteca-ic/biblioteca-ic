import { RentedCopy } from '../../../domain/models/rented-copy'

export interface ListRentedCopiesByUserId {
  listByUserid: (id: string) => Promise<RentedCopy[]>
}