import { CheckRenewBookCopyPermission } from "../../../src/data/usecases/book_copies/check-renew-book-copy-permission"
import { devolution_limit } from "../../../src/domain/contracts/borrowing"
import { bookCopyModelMock } from "../../domain/mocks/bookCopy.mock"

describe('CheckRenewBookCopyPermission', () => {
  test('should return error if devolution date is more than devolution limit', async () => {
    const sut = new CheckRenewBookCopyPermission()
    const error = new Error('Compared date is greather than devolution limit.')
    const bookCopyModelMockUpdated = { ...bookCopyModelMock, ...{ lease_date: new Date() } }
    const compare_date = new Date()
    bookCopyModelMockUpdated.lease_date.setDate(compare_date.getDate() - devolution_limit - 1)
    const response = await sut.canRenew(bookCopyModelMockUpdated, compare_date)
    expect(response).toEqual(error)
  })
  test('should return undefined if has success', async () => {
    const sut = new CheckRenewBookCopyPermission()
    const response = await sut.canRenew(bookCopyModelMock, new Date())
    expect(response).toBeUndefined()
  })
})