import type { Component } from 'solid-js'
import { Routes, Route } from '@solidjs/router'
import { lazy } from 'solid-js'

import Home from './screens/Landing'
import RouteGuard from './screens/RouteGuard'
import Orders from './screens/dashboard/Orders'

const SignIn = lazy(() => import('./screens/SignIn'))
const RecoverPassword = lazy(() => import('./screens/RecoverPassword'))
const ConfirmEmail = lazy(() => import('./screens/ConfirmEmail'))
const SignUp = lazy(() => import('./screens/SignUp'))
const Dashboard = lazy(() => import('./screens/Dashboard'))
// const Orders = lazy(() => import('./screens/dashboard/Orders'))

const App: Component = () => (
  <>
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup">
        <Route path="/" component={SignUp} />
        <Route path="/:package" component={SignUp} />
      </Route>
      <Route path="/recover-password" component={RecoverPassword} />
      <Route path="/confirm-email" component={ConfirmEmail} />
      <Route path="/" component={RouteGuard}>
        <Route path="/dashboard" component={Dashboard}>
          <Route path="/" component={Orders} />
          <Route path="/orders" component={Orders} />
          <Route path="/profile" component={Orders} />
          <Route path="/settings" component={Orders} />
        </Route>
        <Route path="/logout" component={Dashboard} />
      </Route>
      <Route path="*" element={<div>Page Not found!!!</div>} />
    </Routes>
  </>
)

export default App
