import { HashComparer } from '../../data/protocols/hash-comparer'
import { compare } from 'bcrypt'

export class BcryptAdapter implements HashComparer {
  async compare (value: string, hash: string): Promise<boolean> {
    const isAuth = await compare(value, hash)
    return isAuth
  }
}
