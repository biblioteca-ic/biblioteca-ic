import { InvalidFormatError } from '../../errors/invalid-form-error'
import { Validation } from '../protocols/validation'

export class RegistrationNumberValidator implements Validation {
  constructor (private readonly fieldName: string) { }

  validate (input: any): Error|null {
    if (input[this.fieldName]) {
      if (input[this.fieldName].length !== 8 || !input[this.fieldName].match(/^[0-9]+$/)) {
        return new InvalidFormatError(this.fieldName)
      }
    }
    return null
  }
}
