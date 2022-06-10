import { CronJob } from "cron"
import { makeLateCopiesJob } from "./factories/make-late-copies-job"
import { JobContract } from "./protocols/job-contract"

export class JobsKernel {
  public async setUp (): Promise<void> {
    this.run('0 3 * * *', makeLateCopiesJob())
  }

  private async run (cronTime: string, job: JobContract): Promise<void> {
    const cronJob = new CronJob(cronTime, async () => job.runJob(), null, false, 'America/Maceio')
    cronJob.start()
  }
}