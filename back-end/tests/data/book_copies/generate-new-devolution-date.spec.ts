import { GenerateNewDevolutionDate } from "../../../src/data/usecases/book_copies/generate-new-devolution-date"
import { devolution_limit, new_devolution } from "../../../src/domain/contracts/borrowing"

describe('GenerateNewDevolutionDate', () => {
  test('should return a Date on success', async () => {
    const sut = new GenerateNewDevolutionDate()
    const response = await sut.generate(new Date(), new Date())
    expect(response).toBeInstanceOf(Date)
  })
  test('should return, if new date is smaller than devolution limit, the new date', async () => {
    const sut = new GenerateNewDevolutionDate()
    const lease_date = new Date()
    const current = new Date(lease_date.getTime())
    const response = await sut.generate(current, lease_date)
    const expected = new Date(current.getTime())
    expected.setDate(expected.getDate() + new_devolution)
    expect(response).toBeInstanceOf(Date)
    expect(response.toDateString()).toBe(expected.toDateString())
  })
  test('should return, if new date is greater than devolution limit, the devolution limit', async () => {
    const sut = new GenerateNewDevolutionDate()
    const lease_date = new Date()
    const current = new Date(lease_date.getTime())
    current.setDate(current.getDate() + devolution_limit)
    const response = await sut.generate(current, lease_date)
    const expected = new Date(lease_date.getTime())
    expected.setDate(expected.getDate() + devolution_limit)
    expect(response).toBeInstanceOf(Date)
    expect(response.toDateString()).toBe(expected.toDateString())
  })
})