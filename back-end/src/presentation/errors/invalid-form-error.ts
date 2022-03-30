export class InvalidFormatError extends Error {
  constructor (fieldName: string) {
    super(`Invalid Format: ${fieldName}`)
  }
}
