import { BookCopyCodeGenerator } from '../../../domain/usecases/book_copies/book-copy-code-generator'
import { FindLastBookCopyCodeInsertedRepository } from '../../protocols/book_copies/find-last-book-copy-code-inserted.repository'

export class DbBookCopyCodeGenerator implements BookCopyCodeGenerator {
  constructor (
    private readonly _findLastBookCopyCodeInsertedRepository: FindLastBookCopyCodeInsertedRepository
  ) { }

  async generate (prefix: string): Promise<string> {
    const lastCode = await this._findLastBookCopyCodeInsertedRepository.find(prefix)
    let code = ''
    if (!lastCode || lastCode.length === 0) code = '0000-000'
    else code = lastCode[0].code

    const fullCode = code.split('-')
    const bookCode = prefix
    const copyCode = fullCode[1]
    const n = copyCode.match(/[1-9]/) ? copyCode.match(/[1-9]/).index : 2
    const k = copyCode.substring(n, copyCode.length)
    const numeric = Number.parseInt(k)
    let l = ''
    if (numeric === 9 || numeric === 99 || numeric === 999) {
      l = bookCode.substring(0, n - 1)
    } else {
      l = bookCode.substring(0, n)
    }

    const newCode = bookCode + '-' + l + (numeric + 1).toString()
    return newCode
  }
}
