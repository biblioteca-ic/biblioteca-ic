export interface BookCodeGenerator {
  generate: () => Promise<string>
}
