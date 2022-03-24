export class UnwantedFieldError extends Error {
  constructor (fieldName: string) {
    super('UnwantedFieldError')
    this.message = `You can't change the field: ${fieldName}`
  }
}
