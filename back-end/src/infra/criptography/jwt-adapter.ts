import { Encrypter } from '../../data/protocols/encrypter'
import { sign } from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secretKey: string) { }

  async encrypt (data: Encrypter.Params): Promise<string> {
    const token = sign(data, this.secretKey)
    return Promise.resolve(token)
  }
}
