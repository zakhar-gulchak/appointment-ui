import type { Component } from 'solid-js'
import { Routes, Route } from '@solidjs/router'
import { lazy } from 'solid-js'

import Home from './screens/Landing'
import RouteGuard from './screens/RouteGuard'
import Footer from './common/Footer'
import './App.module.css'

const SignIn = lazy(() => import('./screens/SignIn'))
const SignUp = lazy(() => import('./screens/SignUp'))
const Dashboard = lazy(() => import('./screens/Dashboard'))

const App: Component = () => {
  return (
    <>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/singup" component={SignUp} />
        <Route path="/" component={RouteGuard}>
          <Route path="/dashboard" component={Dashboard} />
        </Route>
        <Route path="*" element={()=> <div>Page Not found!!!</div>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
