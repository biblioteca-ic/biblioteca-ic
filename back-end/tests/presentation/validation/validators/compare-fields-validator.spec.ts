import { InvalidFieldError } from '../../../../src/presentation/errors/invalid-field-error'
import { CompareFieldsValidator } from '../../../../src/presentation/validation/validators/compare-fields-validator'

describe('CompareFields Validator', () => {
  test('should return an invalid field error if fieldToCompare is different to fieldName', () => {
    const sut = new CompareFieldsValidator('password', 'passwordConfirmation')
    const response = sut.validate({ password: 'any_password', passwordConfirmation: 'other_password' })
    expect(response).toEqual(new InvalidFieldError('password'))
  })

  test('should return nothing if the fields are equal', () => {
    const sut = new CompareFieldsValidator('password', 'passwordConfirmation')
    const response = sut.validate({ password: 'any_password', passwordConfirmation: 'any_password' })
    expect(response).toBeUndefined()
  })
})
