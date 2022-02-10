import React from 'react';
import { Redirect, Route, Switch, RouteProps } from 'react-router-dom';
import { routes } from './routes';

interface CustomRouteProps {
  component: () => JSX.Element;
  roles?: string[];
  path?: string;
  exact: boolean;
}

const PrivateRoute: React.FC<CustomRouteProps & RouteProps> = ({ component: Component, ...rest }) => {
  const user = {
    profileTag: 'admin',
  };

  if (!user) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
};

const PublicRoute: React.FC<CustomRouteProps & RouteProps> = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => <Component {...props} />} />;
};

export const Navigation = () => {
  return (
    <Switch>
      {routes.map(route =>
        route.private ? (
          <PrivateRoute roles={route.roles} key={route.path} path={route.path} exact component={route.component} />
        ) : (
          <PublicRoute key={route.path} path={route.path} exact component={route.component} />
        ),
      )}
      <Redirect to="/" exact />
    </Switch>
  );
};
