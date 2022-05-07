import { CronJob } from 'cron'
import { LoadRentedCopiesRepository } from '../../data/protocols/book_copies/load-rented-copies.repository'
import { UpdateBookCopyStatusRepository } from '../../data/protocols/book_copies/update-book-copy.repository'
import { devolution_limit, lateLimit } from '../../domain/contracts/borrowing'

export class LateCopiesJob {
  constructor (
    private readonly _loadRentedCopiesRepository: LoadRentedCopiesRepository,
    private readonly _updateBookCopyStatusRepository: UpdateBookCopyStatusRepository,
  ) { }
  public runJob (): void {
    const cronJob = new CronJob(
      '0 3 * * *',
      async () => {
        const copies = await this._loadRentedCopiesRepository.loadAll()
        const now = new Date()
        const millisecondsInADay = 86400000
        if (copies.length > 0) {
          copies.forEach(async (copy) => {
            const daysToDevolution = Math.trunc(((copy.devolution_date.getTime() - now.getTime()) / millisecondsInADay))
            const rentedDays = Math.abs(Math.trunc(((copy.lease_date.getTime() - now.getTime()) / millisecondsInADay)))
            if (rentedDays >= devolution_limit) {
              await this._updateBookCopyStatusRepository.updateToLate(copy.id)
            }
            if (Math.abs(daysToDevolution) >= lateLimit) {
              await this._updateBookCopyStatusRepository.updateToMisplaced(copy.id)
            } else if (daysToDevolution < 0) {
              await this._updateBookCopyStatusRepository.updateToLate(copy.id)
            }
          })
        }
      },
      null,
      false,
      'America/Maceio')

    cronJob.start()
  }
}
