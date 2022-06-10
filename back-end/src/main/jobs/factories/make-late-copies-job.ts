import { BookCopyPrismaRepository } from "../../../infra/db/book-copy-prisma-repository"
import { JobContract } from "../protocols/job-contract"
import { LateCopiesJob } from "../usecases/late-copies-job"

export const makeLateCopiesJob = (): JobContract => {
  const bookCopyRepo = new BookCopyPrismaRepository()
  const job = new LateCopiesJob(bookCopyRepo, bookCopyRepo)
  return job
}