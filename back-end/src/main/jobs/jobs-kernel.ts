import { CronJob } from "cron"
import { makeLateCopiesJob } from "./factories/make-late-copies-job"
import { makeRememberTheDelayedBooksJob } from "./factories/make-remember-the-delayed-books-jobs"
import { makeRememberToReturnJob } from "./factories/make-remember-to-return-job"
import { JobContract } from "./protocols/job-contract"

export class JobsKernel {
  public async setUp (callback?: () => void): Promise<void> {
    this.run('0 3 * * *', makeLateCopiesJob())
    this.run('30 4 * * *', makeRememberToReturnJob())
    this.run('45 4 * * *', makeRememberTheDelayedBooksJob())
    this.run('36 3 * * *', makeRememberToReturnJob())
    this.run('36 3 * * *', makeRememberTheDelayedBooksJob())
    callback?.()
  }

  private async run (cronTime: string, job: JobContract): Promise<void> {
    const cronJob = new CronJob(cronTime, async () => job.runJob(), null, false, 'America/Maceio')
    cronJob.start()
  }
}