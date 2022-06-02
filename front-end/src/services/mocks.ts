import { COPY_BOOK } from '../constants';

export const usersMock = [
  {
    id: '1',
    name: 'karen',
    email: 'kngs@ic.ufal.br',
    role: 'student',
    cpf: '08103728438',
    registrationNumber: '16210112',
    admin: true,
  },
  {
    id: '2',
    name: 'bruno',
    email: 'bruno@ic.ufal.br',
    role: 'student',
    cpf: '08103728438',
    registrationNumber: '16210112',
    admin: false,
  },
  {
    id: '3',
    name: 'william',
    email: 'william@ic.ufal.br',
    role: 'admin',
    cpf: '08103728438',
    registrationNumber: '16210112',
    admin: false,
  },
];

export const booksMock = [
  {
    id: '1',
    title: 'O alienista',
    publishingHouse: 'Editora Ática',
    authors: ['Machado de Assis', 'Jose de Alencar'],
    categories: ['Literatura brasileira', 'Romance'],
    createdBy: '1',
    code: '001-000',
    publishedIn: '1884',
    createdAt: '2022',
  },
  {
    id: '2',
    title: 'Dom Casmurro',
    publishingHouse: 'Editora Dialética',
    authors: ['Aluísio Azevedo'],
    categories: ['Romance', 'Literatura brasileira'],
    createdBy: '1',
    code: '001-000',
    publishedIn: '1890',
    createdAt: '2022',
  },
];

export const copiesMock = [
  {
    title: 'Calculo 2',
    authors: ['George B. Thomas'],
    email: 'bruno@ic.ufal.br',
    devolution_date: '2022-05-10T16:52:39.318Z',
    status: 'RENTED',
    copyCode: '0002-001',
    leaseDate: '2022-05-03T16:52:39.318Z',
    bookId: '0b0e8e56-ab13-11ec-8c76-0242ac110002',
    userId: 'b1ec8dfe-ab13-11ec-92c1-0242ac110002',
    copyId: '95f10e00-c78b-4e84-9377-f3f06aa61580',
  },
  {
    title: 'Calculo 1',
    authors: ['James Stewart'],
    email: 'bruno@ic.ufal.br',
    status: 'RENTED',
    devolution_date: '2022-05-10T11:39:24.348Z',
    copyCode: '0001-001',
    leaseDate: '2022-05-03T11:39:24.348Z',
    bookId: '72c92416-a988-11ec-bb0f-0242ac110002',
    userId: 'b1ec8dfe-ab13-11ec-92c1-0242ac110002',
    copyId: '963a15be-ab17-11ec-9e0f-0242ac110002',
  },
];
