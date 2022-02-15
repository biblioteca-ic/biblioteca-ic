import { InvalidFormatError } from '../../errors/invalid-form-error'
import { Validation } from '../protocols/validation'

export class PasswordValidator implements Validation {
  constructor (private readonly fieldName: string) { }

  validate (input: any): Error {
    if (!input[this.fieldName].match(/^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#)!&*($_%^&+=\W-]).*$/)) {
      return new InvalidFormatError('password')
    }
  }
}
