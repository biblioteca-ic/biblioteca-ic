import { NumberValidator } from '../../../../src/presentation/validation/validators/number-validator'
import { InvalidFormatError } from '../../../../src/presentation/errors/invalid-form-error'

describe('Number Validator', () => {
  test('should return an invalid format error if characters are not all numerics', () => {
    const sut = new NumberValidator('cpf', 11)
    const result = sut.validate({ cpf: '1111111111a' })
    expect(result).toEqual(new InvalidFormatError('cpf'))
  })

  test('should return an invalid format error if the input has fewer characters than necessary', () => {
    const sut = new NumberValidator('cpf', 11)
    const result = sut.validate({ cpf: '1111111111' })
    expect(result).toEqual(new InvalidFormatError('cpf'))
  })

  test('should return nothing if input meet all requirements', () => {
    const sut = new NumberValidator('cpf', 11)
    const result = sut.validate({ cpf: '01234567890' })
    expect(result).toBeUndefined()
  })
})
