import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { ShowProfile, EditProfile, ChangePassword } from '../modules/Profile';
import { UsersItemPage, UsersList } from '../modules/Users';
import { BooksItemPage, BooksList, EditBook, NewBook } from '../modules/Books';

export const routes = [
  {
    path: '/',
    component: Dashboard,
    private: false,
  },
  {
    path: '/login',
    component: Login,
    private: false,
  },
  {
    path: '/register',
    component: Register,
    private: false,
    onlyAdmin: false,
  },
  {
    path: '/profile',
    component: ShowProfile,
    private: false,
  },
  {
    path: '/profile/edit',
    component: EditProfile,
    private: false,
  },
  {
    path: '/profile/edit/password',
    component: ChangePassword,
    private: false,
  },
  {
    path: '/users',
    component: UsersList,
    private: false,
    onlyAdmin: false,
  },
  {
    path: '/users/show/:id',
    component: UsersItemPage,
    private: false,
    onlyAdmin: false,
  },
  {
    path: '/books',
    component: BooksList,
    private: false,
    onlyAdmin: false,
  },
  {
    path: '/books/new',
    component: NewBook,
    private: false,
    onlyAdmin: false,
  },
  {
    path: '/books/show/:id',
    component: BooksItemPage,
    private: false,
    onlyAdmin: false,
  },
  {
    path: '/books/edit/:id',
    component: EditBook,
    private: false,
    onlyAdmin: false,
  },
];
