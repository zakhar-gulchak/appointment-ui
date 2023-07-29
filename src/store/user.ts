import { createStore } from 'solid-js/store'
import { User } from '@firebase/auth'
import { createEffect, createRoot } from 'solid-js'

interface MyUser {
  email: string
  firstName: string
  lastName: string
  accessToken: string
  refreshToken: string
  expirationTime: string
}
const ACCESS_TOKEN_LOCAL_STORAGE_KEY = 'access_token'
const REFRESH_TOKEN_LOCAL_STORAGE_KEY = 'refresh_token'
const USER_LOCAL_STORAGE_KEY = 'user'

function createUserData() {
  const { email, lastName, firstName, expirationTime } = JSON.parse(
    localStorage.getItem(USER_LOCAL_STORAGE_KEY) ?? '',
  ) as MyUser
  const [userData, setUserData] = createStore({
    accessToken: localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY) ?? '',
    refreshToken: localStorage.getItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY) ?? '',
    user: {
      email,
      lastName,
      firstName,
      expirationTime,
    }
  })

  createEffect(() => {
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(userData.user))
  })
  createEffect(() => {
    localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, userData.accessToken)
  })
  createEffect(() => {
    localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY, userData.refreshToken)
  })

  return { userData, setUserData }
}

export const { userData, setUserData} = createRoot(() => createUserData())
