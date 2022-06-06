import { devolution_limit, new_devolution } from "../../../domain/contracts/borrowing"

export class GenerateNewDevolutionDate {
  generate (current: Date = new Date(), lease: Date = new Date()): Date {
    const devolution = new Date(current.getTime())
    devolution.setDate(devolution.getDate() + new_devolution)
    const limit = new Date(lease.getTime())
    limit.setDate(limit.getDate() + devolution_limit)
    if (devolution > limit) return limit
    return devolution
  }
}