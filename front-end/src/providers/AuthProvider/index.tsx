import React, { createContext, useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../../services/api';
import { getUser, login, logout, USER_KEY } from '../../services/auth';
import { UserType } from '../../types/User';
// import { usersMock } from '../../services/mocks';

interface AuthState {
  user: UserType;
}

interface SignInCredentials {
  cpf: string;
  password: string;
}

interface AuthContextData {
  user: UserType;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: UserType): void;
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
    const { data } = await api.post('/api/login', {
      cpf,
      password,
    });

    login(JSON.stringify(data.body), data.body.accessToken);

    setData({ user: data.body });
  }, []);

  const signOut = useCallback(() => {
    logout();

    history.push('/');

    setData({} as AuthState);
  }, [history]);

  const updateUser = useCallback(
    (user: UserType) => {
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
