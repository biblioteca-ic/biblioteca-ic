import { LoadRentedCopiesRepository } from "../../../data/protocols/book_copies/load-rented-copies.repository";
import { BookCopyModel } from "../../../domain/models/book_copy";
import { JobContract } from "../protocols/job-contract";

export class RememberToReturnJob implements JobContract {
  constructor (
    private readonly _loadRentedCopiesRepository: LoadRentedCopiesRepository,
  ) { }
  public async runJob (): Promise<void> {
    const copies = await this._loadRentedCopiesRepository.loadAll()
    const now = new Date()
    const millisecondsInADay = 86400000
    if (copies.length > 0) {
      copies.forEach(async (copy: BookCopyModel) => {
        const daysToDevolution = Math.trunc(((copy.devolution_date.getTime() - now.getTime()) / millisecondsInADay))
        if (daysToDevolution < 0) {
          return;
        }
        if (daysToDevolution === 1) {
          // TODO: Send mail to user remember to return the book tomorrow
        }
        if (daysToDevolution === 0) {
          // TODO: Send mail to user to return the book today
        }
      })
    }
  }
}