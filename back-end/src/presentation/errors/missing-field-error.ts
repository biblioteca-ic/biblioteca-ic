export class MissingFieldError extends Error {
  constructor (fieldName: string) {
    super('MissingFieldError')
    this.message = `${fieldName} is a required field`
  }
}
