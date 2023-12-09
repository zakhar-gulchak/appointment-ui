import { useNavigate } from '@solidjs/router'
import { createEffect } from 'solid-js'
import { getAuth, signOut } from 'firebase/auth'

import { setUserData, userData } from '../store/user'
import { auth } from '../config/firebase'

export function redirectLoggedInUser() {
  const navigate = useNavigate()
  createEffect(() => {
    if (userData.accessToken) {
      if (new Date(userData.user.expirationTime).getTime() > Date.now()) {
        navigate('/dashboard', { replace: true })
      } else {
        setUserData('accessToken', '')
      }
    }
  })
}

export function logout() {
  const navigate = useNavigate()

  signOut(auth).then(() => {
    setUserData({
      user: undefined,
      accessToken: undefined,
      refreshToken: undefined,
    })
  }).catch((error) => {
    // An error happened.
  });

  navigate('/', { replace: true })
}
