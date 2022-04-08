import { Request, Response } from 'express'
import { DbListBookCopyDetails } from '../../../data/usecases/book_copies/db-list-book-copy-details'
import { ListBookCopyDetails } from '../../../domain/usecases/book_copies/list-book-copy-details'
import { BookCopyPrismaRepository } from '../../../infra/db/book-copy-prisma-repository'
import { ListBookCopyDetailsController } from '../../../presentation/controller/book_copies/list-book-copy-details.controller'

const makeListBookCopyDetails = (): ListBookCopyDetails => {
  const bookCopiesPrismaRepository = new BookCopyPrismaRepository()
  return new DbListBookCopyDetails(bookCopiesPrismaRepository)
}

export const makeListBookCopyDetailsController = async (req: Request, res: Response): Promise<any> => {
  const controller = new ListBookCopyDetailsController(makeListBookCopyDetails())
  const request = { ...req.body, ...req.params, ...req.query }
  const result = await controller.handle(request)
  return res.status(result.statusCode).json(result)
}
