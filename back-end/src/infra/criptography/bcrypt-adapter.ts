import { HashComparer } from '../../data/protocols/hash-comparer'
import { compare, hash } from 'bcrypt'
import { Hasher } from '../../data/protocols/hasher'

export class BcryptAdapter implements HashComparer, Hasher {
  async hash (value: string): Promise<string> {
    const hashedValue = await hash(value, 12)
    return hashedValue
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const isAuth = await compare(value, hash)
    return isAuth
  }
}
