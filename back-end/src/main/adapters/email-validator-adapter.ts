import { EmailChecker } from '../../presentation/validation/protocols/email-checker'
import validator from 'validator'

export class EmailValidatorAdapter implements EmailChecker {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
