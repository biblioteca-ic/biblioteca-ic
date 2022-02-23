import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import EditProfile from '../pages/EditProfile';
import Profile from '../pages/Profile';
import ChangePassword from '../pages/ChangePassword';
import { UsersItemPage, UsersList } from '../pages/Users';
import RegisterBook from '../pages/RegisterBook';

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
    component: Profile,
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
    path: '/books/register',
    component: RegisterBook,
    private: false,
    onlyAdmin: false,
  },
];
