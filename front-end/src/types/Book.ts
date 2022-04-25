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
  id: string;
  book_id: string;
  status: string;
  statusToString?: string;
  createdAt: string;
  code: string;
  createdBy: string;
  rentedBy?: UserType;
  rentedAt?: string;
}
