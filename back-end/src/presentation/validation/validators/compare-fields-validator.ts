import { InvalidFieldError } from '../../errors/invalid-field-error'
import { Validation } from '../protocols/validation'

export class CompareFieldsValidator implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldToCompare: string
  ) { }

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompare]) {
      return new InvalidFieldError(this.fieldName)
    }
  }
}
