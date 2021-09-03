import React from 'react';
import { Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Homepage from './Pages/Homepage/Homepage.js';
import Registration from './Pages/Registration/index.js';
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
    </div>
  );
}

export default App;
