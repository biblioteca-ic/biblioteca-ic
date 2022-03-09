import { InvalidFieldError } from '../../errors/invalid-field-error'
import { Validation } from '../protocols/validation'

export class IsArrayValidator implements Validation {
  constructor (private readonly fieldName: string) { }
  validate (input: any): Error {
    if (!Array.isArray(input[this.fieldName])) {
      return new InvalidFieldError(this.fieldName)
    }
  }
}
