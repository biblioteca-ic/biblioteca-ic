import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { ShowProfile, EditProfile, ChangePassword } from '../modules/Profile';
import { UsersItemPage, UsersList } from '../modules/Users';
import { BooksItemPage, BooksList, NewEditBook } from '../modules/Books';

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
    private: true,
    onlyAdmin: true,
  },
  {
    path: '/profile',
    component: ShowProfile,
    private: true,
  },
  {
    path: '/profile/edit',
    component: EditProfile,
    private: true,
  },
  {
    path: '/profile/edit/password',
    component: ChangePassword,
    private: true,
  },
  {
    path: '/users',
    component: UsersList,
    private: true,
    onlyAdmin: true,
  },
  {
    path: '/users/show/:id',
    component: UsersItemPage,
    private: true,
    onlyAdmin: true,
  },
  {
    path: '/books',
    component: BooksList,
    private: false,
    onlyAdmin: false,
  },
  // {
  //   path: '/books/new',
  //   component: NewBook,
  //   private: false,
  //   onlyAdmin: false,
  // },
  {
    path: '/books/new',
    component: NewEditBook,
    private: true,
    onlyAdmin: true,
  },
  {
    path: '/books/edit/:id',
    component: NewEditBook,
    private: true,
    onlyAdmin: true,
  },
  {
    path: '/books/show/:id',
    component: BooksItemPage,
    private: false,
    onlyAdmin: false,
  },
  // {
  //   path: '/books/edit/:id',
  //   component: EditBook,
  //   private: false,
  //   onlyAdmin: false,
  // },
];
