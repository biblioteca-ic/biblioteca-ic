import { InvalidFieldError } from '../../../../src/presentation/errors/invalid-field-error'
import { FieldsAreDifferentValidator } from '../../../../src/presentation/validation/validators/fields-are-different-validator'

describe('FieldsAreDifferent Validator', () => {
  test('should return an invalid field error if fieldToCompare is equal to fieldName', () => {
    const sut = new FieldsAreDifferentValidator('password', 'passwordConfirmation')
    const response = sut.validate({ password: 'any_password', passwordConfirmation: 'any_password' })
    expect(response).toEqual(new InvalidFieldError('password'))
  })
})
