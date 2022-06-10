import { BookCopyPrismaRepository } from "../../../infra/db/book-copy-prisma-repository"
import { JobContract } from "../protocols/job-contract"
import { RememberToReturnJob } from "../usecases/remember-to-return-job"

export const makeRememberToReturnJob = (): JobContract => {
  const bookCopyRepo = new BookCopyPrismaRepository()
  const job = new RememberToReturnJob(bookCopyRepo)
  return job
}