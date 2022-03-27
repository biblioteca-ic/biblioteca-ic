import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import EditProfile from '../pages/EditProfile';
import Profile from '../pages/Profile';
import ChangePassword from '../pages/ChangePassword';
import { UsersItemPage, UsersList } from '../pages/Users';
import RegisterBook from '../pages/RegisterBook';
import EditBook from '../pages/EditBook';
import { BooksItemPage, BooksList } from '../pages/Books';

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
    component: Profile,
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
    path: '/books/register',
    component: RegisterBook,
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
