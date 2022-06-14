import { JobContract } from "../protocols/job-contract";
import { BookCopyModel } from "../../../domain/models/book_copy";
import { LoadDelayedAndMisplacedCopiesRepository } from "../../../data/protocols/book_copies/load-delayed-and-misplaced-copies.repository";
import { diacom_email } from "../../../domain/contracts/mail";
import { LoadUserByIdRepository } from "../../../data/protocols/users/load-user-by-id.repository";
import { Mail } from "../../../infra/mail/mail";
import { RememberDelayedBooksForUserTemplate } from "../../../infra/mail/templates/remember-delayed-books-for-user-template";
import { RememberDelayedBooksForDiacomTemplate } from "../../../infra/mail/templates/remember-delayed-books-for-diacom-template";

export class RememberTheDelayedBooks implements JobContract {
  constructor (
    private readonly _loadDelayedAndMisplacedCopiesRepository: LoadDelayedAndMisplacedCopiesRepository,
    private readonly _loadUserById: LoadUserByIdRepository,
    private readonly _mail: Mail,
  ) { }
  public async runJob (): Promise<void> {
    console.log('Remember the delayed books job is running');
    const copies = await this._loadDelayedAndMisplacedCopiesRepository.loadDelayedAndMisplaced()
    const now = new Date()
    const millisecondsInADay = 86400000
    if (copies.length > 0) {
      copies.forEach(async (copy: BookCopyModel) => {
        if (copy.devolution_date === null) {
          return
        }
        const daysToDevolution = Math.trunc(((copy.devolution_date.getTime() - now.getTime()) / millisecondsInADay))
        console.log('Book ', copy.book_id, ' is delayed ', Math.abs(daysToDevolution), ' days.');
        if (daysToDevolution === -5 || daysToDevolution === -20 || daysToDevolution === -90) {
          const user = await this._loadUserById.loadById(copy.located_by)
          const templateUser = new RememberDelayedBooksForUserTemplate(user.name)
          this._mail.sendMail(user.email, "Lembrete de atraso", templateUser)
          const templateDiacom = new RememberDelayedBooksForDiacomTemplate(user.name, Math.abs(daysToDevolution))
          this._mail.sendMail(diacom_email, "Lembrete de atraso", templateDiacom)
        }
      })
    }
    console.log('Remember the delayed books job is finished');
  }
}