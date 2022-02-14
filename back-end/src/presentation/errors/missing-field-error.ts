export class MissingFieldError extends Error {
  constructor (fieldName: string) {
    super(`${fieldName} is a required field`)
  }
}
