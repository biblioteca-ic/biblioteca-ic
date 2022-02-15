import React from 'react';
import { Redirect, Route, Switch, RouteProps, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { isAuthenticated } from '../services/auth';
import { routes } from './routes';

interface CustomRouteProps {
  component: () => JSX.Element;
  onlyAdmin?: boolean;
  path?: string;
  exact: boolean;
}

const PrivateRoute: React.FC<CustomRouteProps & RouteProps> = ({ component: Component, onlyAdmin, ...rest }) => {
  const { user } = useAuth();

  if (!isAuthenticated()) {
    return <Redirect to="/login" />;
  }

  if (onlyAdmin && !user.admin) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
};

const PublicRoute: React.FC<CustomRouteProps & RouteProps> = ({ component: Component, ...rest }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user && user.id && location.pathname === '/login') {
    return <Redirect to="/" />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
};

export const Navigation = () => {
  return (
    <Switch>
      {routes.map(route =>
        route.private ? (
          <PrivateRoute
            onlyAdmin={route.onlyAdmin}
            key={route.path}
            path={route.path}
            exact
            component={route.component}
          />
        ) : (
          <PublicRoute key={route.path} path={route.path} exact component={route.component} />
        ),
      )}
      <Redirect to="/" exact />
    </Switch>
  );
};
