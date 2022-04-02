import { RequiredFieldValidator } from '../../../../src/presentation/validation/validators/required-field-validator'
import { MissingFieldError } from '../../../../src/presentation/errors/missing-field-error'

describe('RequiredField Validator', () => {
  test('should return an missing param error', () => {
    const sut = new RequiredFieldValidator('name')
    const response = sut.validate({})
    expect(response).toEqual(new MissingFieldError('name'))
  })

  test('should return nothing if required field is provided', () => {
    const sut = new RequiredFieldValidator('name')
    const response = sut.validate({ name: 'any_name' })
    expect(response).toBeUndefined()
  })
})
