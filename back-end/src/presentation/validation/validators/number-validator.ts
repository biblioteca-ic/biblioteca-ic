import { InvalidFormatError } from '../../errors/invalid-form-error'
import { Validation } from '../protocols/validation'

export class NumberValidator implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly length: number = 1
  ) { }

  validate (input: any): Error {
    if (input[this.fieldName]) {
      if (input[this.fieldName].length !== this.length || !input[this.fieldName].match(/^[0-9]+$/)) {
        return new InvalidFormatError(this.fieldName)
      }
    }
  }
}
