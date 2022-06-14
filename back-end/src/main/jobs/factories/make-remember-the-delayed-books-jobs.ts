import { BookCopyPrismaRepository } from "../../../infra/db/book-copy-prisma-repository"
import { JobContract } from "../protocols/job-contract"
import { RememberTheDelayedBooks } from "../usecases/remember-the-delayed-books"

export const makeRememberTheDelayedBooksJob = (): JobContract => {
  const bookCopyRepo = new BookCopyPrismaRepository()
  const job = new RememberTheDelayedBooks(bookCopyRepo)
  return job
}