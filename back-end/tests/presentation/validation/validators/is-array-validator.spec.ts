import { IsArrayValidator } from '../../../../src/presentation/validation/validators/is-array-validator'
import { InvalidFieldError } from '../../../../src/presentation/errors/invalid-field-error'

describe('IsArray Validator', () => {
  test('should return an invalid field error if data is not an array', () => {
    const sut = new IsArrayValidator('categories')
    const response = sut.validate({ categories: 'category' })
    expect(response).toEqual(new InvalidFieldError('categories'))
  })

  test('should return nothing if input is an array', () => {
    const sut = new IsArrayValidator('categories')
    const response = sut.validate({ categories: ['category'] })
    expect(response).toBeUndefined()
  })
})
