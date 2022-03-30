import { UnwantedFieldError } from '../../errors/unwanted-field-error'
import { Validation } from '../protocols/validation'

export class UnwantedFieldValidator implements Validation {
  constructor (private readonly fildName: string) { }

  validate (input: any): Error {
    if (this.fildName in input) {
      return new UnwantedFieldError(this.fildName)
    }
  }
}
