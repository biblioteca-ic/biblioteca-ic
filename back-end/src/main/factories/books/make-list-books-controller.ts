import { Request, Response } from 'express'
import { DbListBooks } from '../../../data/usecases/books/db-list-books'
import { ListBooks } from '../../../domain/usecases/books/list-books'
import { BookPrismaRepository } from '../../../infra/db/book-prisma-repository'
import { ListBooksController } from '../../../presentation/controller/books/list-books.controller'

const makeListBooks = (): ListBooks => {
  const bookPrismaRepository = new BookPrismaRepository()
  return new DbListBooks(bookPrismaRepository)
}

export const makeListBooksController = async (req: Request, res: Response): Promise<any> => {
  const controller = new ListBooksController(makeListBooks())
  const request = { ...req.body, ...req.params, ...req.query }
  const result = await controller.handle(request)
  return res.status(result.statusCode).json(result)
}
