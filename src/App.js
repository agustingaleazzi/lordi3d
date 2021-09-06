import React from 'react';
import { Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Homepage from './Pages/Homepage/Homepage.js';
import Registration from './Pages/Registration/Registration.js';
import Login from './Pages/Login/Login.js';
import './default.scss';

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={() => (
        <MainLayout>
          <Homepage />
        </MainLayout>
      )} />
      <Route exact path="/registration" render={() => (
        <MainLayout>
          <Registration />
        </MainLayout>
      )} />
            <Route exact path="/login" render={() => (
        <MainLayout>
          <Login />
        </MainLayout>
      )} />
    </div>
  );
}

export default App;
