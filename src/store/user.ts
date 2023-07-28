import { createStore } from 'solid-js/store'
import { User } from '@firebase/auth'

interface MyUser {
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
  expirationTime: string;
}
const ACCESS_TOKEN_LOCAL_STORAGE_KEY = 'access_token'
const REFRESH_TOKEN_LOCAL_STORAGE_KEY = 'refresh_token'
const USER_LOCAL_STORAGE_KEY = 'user'

function createUser() {
  const { email, lastName, firstName, expirationTime } =
    JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY) ?? '') as MyUser;
  const [user, setUser] =
    createStore({
      accessToken: localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY),
      refreshToken: localStorage.getItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY),
      email,
      lastName,
      firstName,
      expirationTime,
    });

  const setUserAndToken = ({ email, providerData: [userInfo], refreshToken }: User, accessToken: string, expirationTime: string) => {
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY, refreshToken);
    setUser({
      accessToken,
      refreshToken,
      email: email ?? '',
      firstName: userInfo.displayName ?? '',
      lastName: userInfo.displayName ?? '',
      expirationTime });
  }

  return { user, setUser: setUserAndToken };
}

export const { user, setUser } = createUser();
