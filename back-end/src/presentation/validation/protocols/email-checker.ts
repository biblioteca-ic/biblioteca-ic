export interface EmailChecker {
  isValid: (email: string) => boolean
}
