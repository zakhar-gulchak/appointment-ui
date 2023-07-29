import { useNavigate } from '@solidjs/router'
import { createEffect } from 'solid-js'

import { setUserData, userData } from '../store/user'

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
