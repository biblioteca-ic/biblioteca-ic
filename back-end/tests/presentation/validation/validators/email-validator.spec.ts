import { EmailValidator } from '../../../../src/presentation/validation/validators/email-validator'
import { EmailValidatorAdapter } from '../../../../src/main/adapters/email-validator-adapter'
import { EmailChecker } from '../../../../src/presentation/validation/protocols/email-checker'
import { InvalidFormatError } from '../../../../src/presentation/errors/invalid-form-error'

type SutTypes = {
  sut: EmailValidator
  emailValidatorStub: EmailChecker
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = new EmailValidatorAdapter()
  const sut = new EmailValidator('email', emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('EmailValidator', () => {
  test('should return an invalid field error if an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const response = sut.validate({ email: 'any_email@.com' })
    expect(response).toEqual(new InvalidFormatError('email'))
  })

  test('should return an invalid field error if the email passed is not from IC', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(true)
    const response = sut.validate({ email: 'gideao@gmail.com' })
    expect(response).toEqual(new InvalidFormatError('email'))
  })

  test('should return nothing if a correct email is provided', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(true)
    const response = sut.validate({ email: 'gideao@ic.ufal.br' })
    expect(response).toBeUndefined()
  })
})
