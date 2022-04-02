import { Validation } from '../../../../src/presentation/validation/protocols/validation'
import { ValidationComposite } from '../../../../src/presentation/validation/validators/validation-composite'
import { MissingFieldError } from '../../../../src/presentation/errors/missing-field-error'

const mockValidator = (): Validation => {
  class MockValidator implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new MockValidator()
}

const makeSut = (): any => {
  const validationStub = [mockValidator()]
  const sut = new ValidationComposite(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('ValidationComposite', () => {
  test('should return an exception if any validator fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub[0], 'validate').mockReturnValueOnce(new MissingFieldError('field'))
    const result = sut.validate({ field: 'any_field' })
    expect(result).toEqual(new MissingFieldError('field'))
  })

  test('should call all validators', () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub[0], 'validate')
    sut.validate({ field: 'any_field' })
    expect(validateSpy).toHaveBeenCalled()
  })

  test('should return nothing if everything is ok', () => {
    const { sut } = makeSut()
    const result = sut.validate({ field: 'any_field' })
    expect(result).toBeUndefined()
  })
})
