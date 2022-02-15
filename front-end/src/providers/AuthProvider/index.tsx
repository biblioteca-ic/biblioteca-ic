import React, { createContext, useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { api } from '../../services/api';
import { getUser, login, logout, USER_KEY } from '../../services/auth';
// import { usersMock } from '../../services/mocks';

interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  registrationNumber: string;
  admin: boolean;
  role: string;
}

interface AuthState {
  user: User;
}

interface SignInCredentials {
  cpf: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();

  const [data, setData] = useState<AuthState>(() => {
    const user = getUser();
    // const user = JSON.stringify(usersMock[0]); //remove after

    if (user) {
      return { user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ cpf, password }) => {
    const { data: user } = await api.post('/api/login', {
      cpf,
      password,
    });

    console.log('data', user);

    login(JSON.stringify(user), JSON.stringify(user.accessToken));

    setData({ user });
  }, []);

  const signOut = useCallback(() => {
    logout();

    history.push('/');

    setData({} as AuthState);
  }, [history]);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      setData({
        user,
      });
    },
    [setData],
  );

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, updateUser }}>{children}</AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
