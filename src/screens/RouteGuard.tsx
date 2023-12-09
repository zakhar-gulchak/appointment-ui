import { useNavigate } from '@solidjs/router'
import { createEffect } from 'solid-js'

import { userData } from '../store/user'

export default function RouteGuard(props) {
  const navigate = useNavigate()
  createEffect(() => {
    if (!userData.accessToken || new Date(userData.user.expirationTime).getTime() < Date.now()) {
      navigate('/signin', { replace: true })
    }
  })

  return (
    <div>
      {props.children}
    </div>
  )
}
