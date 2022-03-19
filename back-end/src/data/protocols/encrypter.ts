export interface Encrypter {
  encrypt: (data: Encrypter.Params) => Promise<string>
}

export namespace Encrypter {
  export type Params = {
    id: string
    admin: boolean
  }
}
