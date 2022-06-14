import { Mail } from "../../../infra/mail/mail";
import { LoadUserByIdRepository } from "../../../data/protocols/users/load-user-by-id.repository";
import { LoadRentedCopiesRepository } from "../../../data/protocols/book_copies/load-rented-copies.repository";
import { BookCopyModel } from "../../../domain/models/book_copy";
import { JobContract } from "../protocols/job-contract";
import { RememberToReturnTomorrowTemplate } from "../../../infra/mail/templates/remember-to-return-tomorrow-template";
import { RememberToReturnTodayTemplate } from "../../../infra/mail/templates/remember-to-return-today-template";

export class RememberToReturnJob implements JobContract {
  constructor (
    private readonly _loadRentedCopiesRepository: LoadRentedCopiesRepository,
    private readonly _loadUserById: LoadUserByIdRepository,
    private readonly _mail: Mail,
  ) {}
  public async runJob (): Promise<void> {
    console.log('Remember to return job is running');
    const copies = await this._loadRentedCopiesRepository.loadAll()
    const now = new Date()
    const millisecondsInADay = 86400000
    if (copies.length > 0) {
      copies.forEach(async (copy: BookCopyModel) => {
        const daysToDevolution = Math.trunc(((copy.devolution_date.getTime() - now.getTime()) / millisecondsInADay))
        console.log('Book ', copy.id, ' needs to be returned in ', daysToDevolution, ' days.');
        if (daysToDevolution === 1) {
          const user = await this._loadUserById.loadById(copy.located_by)
          const template = new RememberToReturnTomorrowTemplate(user.name)
          this._mail.sendMail(user.email, "Lembrete de renovação/devolução", template)
        }
        if (daysToDevolution === 0) {
          const user = await this._loadUserById.loadById(copy.located_by)
          const template = new RememberToReturnTodayTemplate(user.name)
          this._mail.sendMail(user.email, "Lembrete de renovação/devolução", template)
        }
      })
    }
    console.log('Remember to return job is finished');
  }
}