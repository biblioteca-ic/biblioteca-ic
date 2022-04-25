import { CheckUserPendencies } from '../../../src/data/usecases/users/check-user-pendencies'
import { BadRequestError } from '../../../src/presentation/errors/bad-request-error'
import { bookCopyModelMock } from '../../domain/mocks/bookCopy.mock'

describe('CheckUserPendencies', () => {
  test('should return undefined if doesn\'t have copies.', () => {
    const response = CheckUserPendencies.check(Array(0), 'any_uuid')
    expect(response).toBeUndefined()
  })
  test('should return a BadRequestError if have three or more copies.', () => {
    const response = CheckUserPendencies.check(Array(3).fill(bookCopyModelMock), `other_${bookCopyModelMock.id}`)
    expect(response).toEqual(new BadRequestError('You cannot borrow more than 3 books'))
  })
  test('should return a BadRequestError if have some overdue copy.', () => {
    const overdueDate = new Date()
    overdueDate.setDate(overdueDate.getDate() - 1)
    const overdueCopy = { ...bookCopyModelMock, ...{ devolution_date: overdueDate } }
    const response = CheckUserPendencies.check([ overdueCopy ], `other_${bookCopyModelMock.id}`)
    expect(response).toEqual(new BadRequestError('You have overdue returns'))
  })
  test('should return a BarRequestError if a requested book is equal to another current borrowed book.', () => {
    const equalCopy = { ...bookCopyModelMock, ...{ book_id: 'same_uuid' } }
    const response = CheckUserPendencies.check([ equalCopy ], 'same_uuid')
    expect(response).toEqual(new BadRequestError('You can only take one copy of each book'))
  })
  test('should return undefined if is ok.', () => {
    const response = CheckUserPendencies.check([ bookCopyModelMock ], `other_${bookCopyModelMock.id}`)
    expect(response).toBeUndefined()
  })
})