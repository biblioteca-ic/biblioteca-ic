import { GiveBackCopyRepository } from '../../../data/protocols/book_copies/give-back-copy.repository'
import { GiveBackCopy, GiveBackCopyParams } from '../../../domain/usecases/book_copies/give-back-copy'

export class DbGiveBackCopy implements GiveBackCopy {
  constructor (private readonly _giveBackCopyRepository: GiveBackCopyRepository) { }

  async giveBack (params: GiveBackCopyParams): Promise<void> {
    const { copyId } = params
    await this._giveBackCopyRepository.giveBackCopy(copyId)
  }
}
