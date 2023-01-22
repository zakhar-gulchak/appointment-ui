import type { Component } from 'solid-js';
import { Routes, Route } from '@solidjs/router';

import Login from './screens/Login';
import Nav from './common/Nav';
import Footer from './common/Footer';

const App: Component = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/login" component={Login} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
