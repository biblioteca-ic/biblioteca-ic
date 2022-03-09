import { MissingFieldError } from '../../errors/missing-field-error'
import { Validation } from '../protocols/validation'

export class RequiredFieldValidator implements Validation {
  constructor (private readonly fildName: string) { }

  validate (input: any): Error {
    if (!(this.fildName in input)) {
      return new MissingFieldError(this.fildName)
    }
  }
}
