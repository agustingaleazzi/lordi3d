import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import { setCurrentUser } from './redux/User/user.actions';
import { useEffect } from 'react';
//layouts
import MainLayout from './layouts/MainLayout';

//hoc
import WithAuth from './hoc/WithAuth';

//pages
import Homepage from './Pages/Homepage/Homepage.js';
import Registration from './Pages/Registration/Registration.js';
import Login from './Pages/Login/Login.js';
import Recovery from './Pages/Recovery/Recovery';
import Dashboard from './Pages/Dashboard/Dashboard';
import './default.scss';


const App = props => {  
  const dispatch = useDispatch();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          //accion despachada a redux para updatear la info del usuario
          dispatch(setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()            
          }))
        });
      }
      dispatch(setCurrentUser(userAuth));
    });
    return () => {
      authListener();
    }
  }, [])

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
          <Route path="/dashboard" render={() =>(
            <WithAuth>
          <MainLayout>
            <Dashboard />
          </MainLayout>
          </WithAuth>
        )} />
      </div>
    );
  
}


export default App;
