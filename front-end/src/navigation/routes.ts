import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import EditProfile from '../pages/EditProfile';

export const routes = [
  {
    path: '/',
    component: Dashboard,
    private: false,
    roles: [],
  },
  {
    path: '/login',
    component: Login,
    private: false,
    roles: [],
  },
  {
    path: '/register',
    component: Register,
    private: false,
    roles: [],
  },
  {
    path: '/profile/edit',
    component: EditProfile,
    private: false,
    roles: [],
  },
];
