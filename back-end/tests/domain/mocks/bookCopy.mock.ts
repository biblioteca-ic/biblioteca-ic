import { BookCopyModel, BookStatus } from "../../../src/domain/models/book_copy";

export const bookCopyModelMock: BookCopyModel = {
  id: "any_uuid",
  book_id: "any_uuid",
  code: "0000-000",
  status: BookStatus.AVAILABLE,
  created_by: "any_uuid",
  located_by: "any-uuid",
  lease_date: new Date(),
  devolution_date: undefined,
  createdAt: new Date()
}