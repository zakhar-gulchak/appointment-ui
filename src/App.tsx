import type { Component } from 'solid-js'
import { Routes, Route } from '@solidjs/router'
import { lazy } from 'solid-js'

import Home from './screens/Landing'
import Nav from './common/Nav'
import Footer from './common/Footer'
import './App.module.css'

const SignIn = lazy(() => import('./screens/SignIn'))
const SignUp = lazy(() => import('./screens/SignUp'))
const Dashboard = lazy(() => import('./screens/Dashboard'))

const App: Component = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/singup" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
