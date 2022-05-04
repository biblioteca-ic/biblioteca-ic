import { BookCopyModel } from "../../../domain/models/book_copy";

export interface RenewCopyRepository {
  renew: (copyId: string, data: { devolutionDate: Date }) => Promise<BookCopyModel|void>
}
