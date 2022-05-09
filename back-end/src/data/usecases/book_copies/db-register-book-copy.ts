import { BookCopyModel } from '../../../domain/models/book_copy'
import { RegisterBookCopy } from '../../../domain/usecases/book_copies/register-book-copy'
import { CreateBookCopyRepository } from '../../protocols/book_copies/create-book-copy.repository'
import { LoadUserByIdRepository } from '../../protocols/users/load-user-by-id.repository'
import { LoadBookByCodeRepository } from '../../protocols/books/load-book-by-code.repository'
import { BookCopyCodeGenerator } from '../../../domain/usecases/book_copies/book-copy-code-generator'

export class DbRegisterBookCopy implements RegisterBookCopy {
  constructor (
    private readonly _createBookCopy: CreateBookCopyRepository,
    private readonly _loadUserByIdRepository: LoadUserByIdRepository,
    private readonly _loadBookByCodeRepository: LoadBookByCodeRepository,
    private readonly _bookCopyCodeGenerator: BookCopyCodeGenerator
  ) { }

  async add (params: RegisterBookCopy.Params): Promise<BookCopyModel> {
    const { book_code, created_by } = params
    const bookExists = await this._loadBookByCodeRepository.loadByCode(book_code)
    const userExists = await this._loadUserByIdRepository.loadById(created_by)

    if (bookExists && userExists && userExists.admin) {
      const prefix = bookExists.code.split('-')[0]
      const copyCode = await this._bookCopyCodeGenerator.generate(prefix)
      const copyBook = await this._createBookCopy.create({
        code: copyCode,
        created_by: userExists.id,
        book_id: bookExists.id
      })

      return copyBook
    }
    return null
  }
}
