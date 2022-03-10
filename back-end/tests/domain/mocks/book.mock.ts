import { BookModel } from '../../../src/domain/models/book'

export const bookModelMock: BookModel = {
  id: 'any_uuid',
  title: 'any_title',
  publishingHouse: 'any_publishing_house',
  createdBy: 'any_uuid',
  code: '0000-000',
  authors: ['any_author1', 'any_author2'],
  categories: ['any_category'],
  publishedIn: new Date(),
  createdAt: new Date()
}
