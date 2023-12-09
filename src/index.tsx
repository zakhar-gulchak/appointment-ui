/* @refresh reload */
import 'solid-devtools'
import { Route, Router } from '@solidjs/router'
import { lazy } from 'solid-js'
import { render } from 'solid-js/web'

import App from './App'
import Home from './screens/LandingPage'
import RouteGuard from './screens/RouteGuard'
import './index.scss'

const SignInPage = lazy(() => import('./screens/SignInPage'))
const RecoverPasswordPage = lazy(() => import('./screens/RecoverPasswordPage'))
const ConfirmEmailPage = lazy(() => import('./screens/ConfirmEmailPage'))
const SignUpPage = lazy(() => import('./screens/SignUpPage'))
const DashboardLayout = lazy(() => import('./screens/DashboardLayout'))
const OrdersPage = lazy(() => import('./screens/dashboard/OrdersPage'))
const SubscriptionPage = lazy(() => import('./screens/dashboard/SubscriptionPage'))
const ProfilePage = lazy(() => import('./screens/dashboard/ProfilePage'))


render(
  () => (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/signin" component={SignInPage} />
      <Route path="/signup">
        <Route path="/" component={SignUpPage} />
        <Route path="/:package" component={SignUpPage} />
      </Route>
      <Route path="/recover-password" component={RecoverPasswordPage} />
      <Route path="/confirm-email" component={ConfirmEmailPage} />
      <Route path="/" component={RouteGuard}>
        <Route path="/dashboard" component={DashboardLayout}>
          <Route path="/" component={OrdersPage} />
          <Route path="/orders" component={OrdersPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/settings" component={OrdersPage} />
          <Route path="/subscription" component={SubscriptionPage} />
        </Route>
      </Route>
      <Route path="*" component={() => <div>Page Not found!!!</div>} />
    </Router>
  ),
  document.getElementById('root')!,
)
