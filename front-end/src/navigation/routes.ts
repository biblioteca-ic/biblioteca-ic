import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import EditProfile from '../pages/EditProfile';
import Profile from '../pages/Profile';

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
];
