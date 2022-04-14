import { CpfValidator } from 'presentation/validation/validators/cpf-validator'
import { InvalidFormatError } from 'presentation/errors/invalid-form-error'

describe('CpfValidator', () => {
  test('should return a invalid format error if a non numeric cpf is provided', () => {
    const sut = new CpfValidator('cpf')
    const response = sut.validate({ 'cpf': '123.456.789-09' })
    expect(response).toEqual(new InvalidFormatError('cpf'))
  })

  test('should return a invalid format error if a invalid cpf is provided', () => {
    const sut = new CpfValidator('cpf')
    const response = sut.validate({ 'cpf': '12345678900' })
    expect(response).toEqual(new InvalidFormatError('cpf'))
  })

  test('should return undefined if a valid cpf is provided', () => {
    const sut = new CpfValidator('cpf')
    const response = sut.validate({ 'cpf': '12345678909' })
    expect(response).toBeUndefined()
  })
})