import { UserType } from './User';

export interface BookType {
  id: string;
  title: string;
  publishingHouse: string;
  authors: Array<string>;
  categories: Array<string>;
  createdBy: string;
  code: string;
  publishedIn: string;
  createdAt: string;
  availableCopies: number;
  borrowedCopies: number;
  lostCopies: number;
  copies: number;
}

export interface CopyBookType {
  copyCode: string;
  title: string;
  authors: string[];
  status: string;
  leaseDate: string;
  devolution_date: string;
  email: string;
  userId: string;
  copyId: string;
  bookId: string;
}
