import { LoadCopiesByUserIdRepository } from "@/data/protocols/book_copies/load-copies-by-user-id.repository";
import { BookCopyModel } from "@/domain/models/book_copy";
import { ListCopiesLoanedToUser } from "@/domain/usecases/book_copies/list-copies-loaned-to-user";

export class DbListCopiesLoanedToUser implements ListCopiesLoanedToUser {
  constructor (
    private readonly _loadCopiesByUserIdRepository: LoadCopiesByUserIdRepository
  ) {}

  async list (user_id: string): Promise<BookCopyModel[]> {
    const bookCopies = await this._loadCopiesByUserIdRepository.load(user_id)
    return bookCopies
  }
}