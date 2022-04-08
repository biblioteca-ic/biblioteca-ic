import { Request, Response } from 'express'
import { DbListBookCopies } from '../../../data/usecases/book_copies/db-list-book-copies'
import { ListBookCopies } from '../../../domain/usecases/book_copies/list-book-copies'
import { BookCopyPrismaRepository } from '../../../infra/db/book-copy-prisma-repository'
import { ListBookCopiesController } from '../../../presentation/controller/book_copies/list-book-copy.controller'

const makeListBookCopies = (): ListBookCopies => {
  const bookCopiesPrismaRepository = new BookCopyPrismaRepository()
  return new DbListBookCopies(bookCopiesPrismaRepository)
}

export const makeListBookCopiesController = async (req: Request, res: Response): Promise<any> => {
  const controller = new ListBookCopiesController(makeListBookCopies())
  const request = { ...req.body, ...req.params, ...req.query }
  const result = await controller.handle(request)
  return res.status(result.statusCode).json(result)
}
