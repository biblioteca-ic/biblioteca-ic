import { LoadCopiesByUserIdRepository } from '../../../data/protocols/book_copies/load-copies-by-user-id.repository'
import { BorrowCopyRepository } from '../../../data/protocols/book_copies/borrow-copy.repository'
import { BorrowCopy } from '../../../domain/usecases/book_copies/borrow-copy'
import { BookCopyModel } from '../../../domain/models/book_copy'
import { CheckUserPendencies } from '../users/check-user-pendencies'
import { GenerateNewDevolutionDate } from './generate-new-devolution-date'

export class DbBorrowCopy implements BorrowCopy {
  constructor (
    private readonly _loadCopiesByUserIdRepository: LoadCopiesByUserIdRepository,
    private readonly _borrowCopyRepository: BorrowCopyRepository
  ) { }

  async execute (params: BorrowCopy.Params): Promise<any> {
    const { userId, copyId, bookId } = params
    const copies = await this._loadCopiesByUserIdRepository.load(userId)
    const error = await this._checkUserPendencies(copies, bookId)
    if (!error) {
      const devolutionDate = await this._generateNewDevolutionDate()
      await this._borrowCopyRepository.borrow(copyId, { locatedBy: userId, devolutionDate })
      return null
    }
    return error
  }

  async _checkUserPendencies (copies: BookCopyModel[], bookId: string): Promise<Error|void> {
    const result = CheckUserPendencies.check(copies, bookId)
    return result
  }

  async _generateNewDevolutionDate (): Promise<Date> {
    const generateNewDevolutionDate = new GenerateNewDevolutionDate()
    const devolutionDate = await generateNewDevolutionDate.generate()
    return devolutionDate
  }
}
