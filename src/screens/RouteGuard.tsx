import { Outlet, useNavigate } from '@solidjs/router'
import { createEffect } from 'solid-js'

import { user } from '../store/user'

export default function RouteGuard () {
  const navigate = useNavigate()
  createEffect(() => {
    if(!user.accessToken) {
      navigate('/signin', { replace: true })
    }
  })

  return (
    <div>
      <Outlet />
    </div>
  )
}
