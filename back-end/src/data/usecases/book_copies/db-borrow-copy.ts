import { LoadCopiesByUserIdRepository } from '../../../data/protocols/book_copies/load-copies-by-user-id.repository'
import { BorrowCopyRepository } from '../../../data/protocols/book_copies/borrow-copy.repository'
import { BorrowCopy } from '../../../domain/usecases/book_copies/borrow-copy'
import { CheckUserPendencies } from '../users/db-check-user-pendencies'

export class DbBorrowCopy implements BorrowCopy {
  constructor (
    private readonly _loadCopiesByUserIdRepository: LoadCopiesByUserIdRepository,
    private readonly _borrowCopyRepository: BorrowCopyRepository
  ) { }

  async execute (params: BorrowCopy.Params): Promise<any> {
    const { userId, copyId, bookId } = params
    const copies = await this._loadCopiesByUserIdRepository.load(userId)
    const error = CheckUserPendencies.check(copies, bookId)
    if (!error) {
      const devolutionDate = new Date()
      devolutionDate.setDate(devolutionDate.getDate() + 7)
      await this._borrowCopyRepository
        .borrow(copyId, { locatedBy: userId, devolutionDate })
      return null
    }
    return error
  }
}
