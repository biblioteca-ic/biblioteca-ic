import { sign, verify } from 'jsonwebtoken'
import { Decrypter } from '../../data/protocols/decrypter'
import { Encrypter } from '../../data/protocols/encrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secretKey: string) { }

  async encrypt (data: Encrypter.Params): Promise<string> {
    const token = sign(data, this.secretKey)
    return Promise.resolve(token)
  }

  async decrypt (token: string): Promise<string> {
    const decryptedToken: any = verify(token, this.secretKey)
    return Promise.resolve(decryptedToken)
  }
}
