export const TOKEN_KEY = '@BibliotecaIC-Token';
export const USER_KEY = '@BibliotecaIC-User';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUser = () => localStorage.getItem(USER_KEY) || '';

export const login = (user: string, token: string) => {
  localStorage.setItem(USER_KEY, user);
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
};
