import { useState } from 'react';
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
  title: string;
  id: string;
  book_id: string;
  bookTitle: string;
  status: string;
  statusToString?: string;
  createdAt: string;
  code: string;
  createdBy: string;
  located_by?: string;
  rentedAt?: string;
}

