import { PasswordValidator } from '../../../../src/presentation/validation/validators/password-validator'
import { InvalidFormatError } from '../../../../src/presentation/errors/invalid-form-error'

describe('Password Validator', () => {
  test('should return an invalid format error if input does not meet all requirements', () => {
    const sut = new PasswordValidator('password')
    expect(sut.validate({ password: 'senha' })).toEqual(new InvalidFormatError('password'))
    expect(sut.validate({ password: 'Senha' })).toEqual(new InvalidFormatError('password'))
    expect(sut.validate({ password: 'senh@' })).toEqual(new InvalidFormatError('password'))
  })

  test('should return nothing if input meet all requirements', () => {
    const sut = new PasswordValidator('password')
    const result = sut.validate({ password: 'Senh$enha' })
    expect(result).toBeUndefined()
  })
})
