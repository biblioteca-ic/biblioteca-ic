export interface Decoder {
  decodeToken: (token: string) => Promise<string>
}
