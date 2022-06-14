import { UserPrismaRepository } from "../../../infra/db/user-prisma-repository"
import { Mail } from "../../../infra/mail/mail"
import { BookCopyPrismaRepository } from "../../../infra/db/book-copy-prisma-repository"
import { JobContract } from "../protocols/job-contract"
import { RememberToReturnJob } from "../usecases/remember-to-return-job"

export const makeRememberToReturnJob = (): JobContract => {
  const bookCopyRepo = new BookCopyPrismaRepository()
  const userRepo = new UserPrismaRepository()
  const mail = new Mail()
  const job = new RememberToReturnJob(bookCopyRepo, userRepo, mail)
  return job
}