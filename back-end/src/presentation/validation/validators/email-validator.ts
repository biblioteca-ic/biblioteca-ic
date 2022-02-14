import { InvalidFormatError } from '../../errors/invalid-form-error'
import { EmailChecker } from '../protocols/email-checker'
import { Validation } from '../protocols/validation'

export class EmailValidator implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailChecker
  ) { }

  validate (input: any): Error {
    if (input[this.fieldName]) {
      if (!this.emailValidator.isValid(input[this.fieldName]) || !this.isICEmailFormat(input[this.fieldName])) {
        return new InvalidFormatError(this.fieldName)
      }
    }
  }

  private isICEmailFormat (email: string): boolean {
    return /@ic.ufal.br$/.test(email)
  }
}
