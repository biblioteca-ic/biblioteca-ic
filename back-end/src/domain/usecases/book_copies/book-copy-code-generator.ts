export interface BookCopyCodeGenerator {
  generate: (prefix: string) => Promise<string>
}
