export class GenerateNewDevolutionDate {
  async generate(current: Date, lease?: Date): Promise<Date> {
    // TODO: Calculate new devolution date picking new_devolution value and adding to current date
    // TODO: Calculate devolution limit date adding devolution_limit value to lease date
    // TODO: If new devolution date is higher than devolution limit, return devolution limit
    return new Date() // TODO: return new devolution date
  }
}