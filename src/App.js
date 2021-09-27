import React from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { checkUserSession } from './redux/User/user.actions';
import { useEffect } from 'react';
//layouts
import MainLayout from './layouts/MainLayout';

//hoc
import WithAuth from './hoc/WithAuth';
import WithAdminAuth from './hoc/withAdminAuth';

//components
import AdminToolbar from './components/AdminToolbar/AdminToolbar'

//pages
import Homepage from './Pages/Homepage/Homepage.js';
import Registration from './Pages/Registration/Registration.js';
import Login from './Pages/Login/Login.js';
import Recovery from './Pages/Recovery/Recovery';
import Admin from './Pages/Admin/Admin';
import Dashboard from './Pages/Dashboard/Dashboard';
import './default.scss';


const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());

  }, [])

  return (
    <div className="App">
    <AdminToolbar/>
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
      <Route exact path="/login"
        render={() => (
          <MainLayout>
            <Login />
          </MainLayout>
        )} />
      <Route exact path="/recovery"
        render={() => (
          <MainLayout>
            <Recovery />
          </MainLayout>
        )} />
      <Route path="/dashboard" render={() => (
        <WithAuth>
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </WithAuth>
      )} />
      <Route exact path="/admin"
        render={() => (
          <WithAdminAuth>
            <MainLayout>
              <Admin />
            </MainLayout>
          </WithAdminAuth>
        )} />
    </div>
  );

}


export default App;
