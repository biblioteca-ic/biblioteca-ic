import { BookCopyModel } from "../../../domain/models/book_copy";
import { LoadDelayedAndMisplacedCopiesRepository } from "../../../data/protocols/book_copies/load-delayed-and-misplaced-copies.repository";
import { JobContract } from "../protocols/job-contract";

export class RememberTheDelayedBooks implements JobContract {
  constructor (
    private readonly _loadDelayedAndMisplacedCopiesRepository: LoadDelayedAndMisplacedCopiesRepository,
  ) { }
  public async runJob (): Promise<void> {
    const copies = await this._loadDelayedAndMisplacedCopiesRepository.loadDelayedAndMisplaced()
    const now = new Date()
    const millisecondsInADay = 86400000
    if (copies.length > 0) {
      copies.forEach(async (copy: BookCopyModel) => {
        const daysToDevolution = Math.trunc(((copy.devolution_date.getTime() - now.getTime()) / millisecondsInADay))
        if (daysToDevolution === -5 || daysToDevolution === -20 || daysToDevolution === -90) {
          // TODO: Send mail to user remember to return the delayed book
        }
      })
    }
  }
}