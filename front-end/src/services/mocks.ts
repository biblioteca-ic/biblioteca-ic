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
    id: '1',
    title: 'O alienista',
    publishingHouse: 'Editora Ática',
    authors: ['Machado de Assis', 'Jose de Alencar'],
    categories: ['Literatura brasileira', 'Romance'],
    createdBy: '1',
    code: '001-001',
    publishedIn: '1884',
    createdAt: '2022',
    rentedBy: usersMock[0],
    rentedAt: '01-03-2022',
    status: 'AVALIABLE',
  },
];
