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
}

export interface CopyBookType {
  id: string;
  status: string | boolean;
  createdAt: string;
  code: string;
  createdBy: string;
  rentedBy?: UserType;
  rentedAt?: string;
}
