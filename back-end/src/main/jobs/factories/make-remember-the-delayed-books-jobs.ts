import { UserPrismaRepository } from "../../../infra/db/user-prisma-repository"
import { Mail } from "../../../infra/mail/mail"
import { BookCopyPrismaRepository } from "../../../infra/db/book-copy-prisma-repository"
import { JobContract } from "../protocols/job-contract"
import { RememberTheDelayedBooks } from "../usecases/remember-the-delayed-books"

export const makeRememberTheDelayedBooksJob = (): JobContract => {
  const bookCopyRepo = new BookCopyPrismaRepository()
  const userRepo = new UserPrismaRepository()
  const mail = new Mail()
  const job = new RememberTheDelayedBooks(bookCopyRepo, userRepo, mail)
  return job
}