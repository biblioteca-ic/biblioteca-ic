import { UnwantedFieldError } from '../../../../src/presentation/errors/unwanted-field-error'
import { UnwantedFieldValidator } from '../../../../src/presentation/validation/validators/unwanted-field-validator'

describe('UnwantedField Validator', () => {
  test('should return an unwanted field error if an unwanted field is provided', () => {
    const sut = new UnwantedFieldValidator('name')
    const result = sut.validate({ name: 'myname' })
    expect(result).toEqual(new UnwantedFieldError('name'))
  })

  test('should return nothing if the input is allowed', () => {
    const sut = new UnwantedFieldValidator('email')
    const result = sut.validate({ name: 'myname' })
    expect(result).toBeUndefined()
  })
})
