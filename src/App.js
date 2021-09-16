import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import { Component } from 'react';
//layouts
import MainLayout from './layouts/MainLayout';

//pages
import Homepage from './Pages/Homepage/Homepage.js';
import Registration from './Pages/Registration/Registration.js';
import Login from './Pages/Login/Login.js';
import Recovery from './Pages/Recovery/Recovery';
import './default.scss';




const initialState = {
  currentUser: null
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    }
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        });
      }
      this.setState({
        ...initialState
      })
    });
  };
  componenWillUnmount() {
    this.authListener();
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <MainLayout currentUser={currentUser}>
            <Homepage />
          </MainLayout>
        )} />
        <Route exact path="/registration" render={() => currentUser ? <Redirect to="/" /> : (
          <MainLayout currentUser={currentUser}>
            <Registration />
          </MainLayout>
        )} />
        <Route exact path="/login"
          render={() => currentUser ? <Redirect to="/" /> : (
            <MainLayout currentUser={currentUser}>
              <Login />
            </MainLayout>
          )} />
        <Route exact path="/recovery"
          render={() => (
            <MainLayout currentUser={currentUser}>
              <Recovery />
            </MainLayout>
          )} />
      </div>
    );
  }
}

export default App;
