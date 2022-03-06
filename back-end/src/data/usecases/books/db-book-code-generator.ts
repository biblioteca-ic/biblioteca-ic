import { BookCodeGenerator } from '../../../domain/usecases/books/book-code-generator'
import { FindLastBookCodeInsertedRepository } from '../../protocols/books/find-last-book-code-inserted.repository'

export class DbBookCodeGenerator implements BookCodeGenerator {
  constructor (
    private readonly _findLastBookCodeInsertedRepository: FindLastBookCodeInsertedRepository
  ) { }

  async generate (): Promise<string> {
    const lastCode = await this._findLastBookCodeInsertedRepository.find()
    let code = ''
    if (!lastCode || lastCode.length === 0) code = '0000-000'
    else code = lastCode[0].code

    const fullCode = code.split('-')
    const bookCode = fullCode[0]
    const copyCode = fullCode[1]
    const n = bookCode.match(/[1-9]/) ? bookCode.match(/[1-9]/).index : 3
    const k = bookCode.substring(n, bookCode.length)
    const numeric = Number.parseInt(k)
    let l = ''
    if (numeric === 9 || numeric === 99 || numeric === 999) {
      l = bookCode.substring(0, n - 1)
    } else {
      l = bookCode.substring(0, n)
    }
    const newCode = l + (numeric + 1).toString() + '-' + copyCode
    return newCode
  }
}
