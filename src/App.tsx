import React from 'react';
import {Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import {Login} from "./Components/Login/Login";
import {Registration} from "./Components/Registration/Registration";
import {Profile} from "./Components/Profile/Profile";
import {PasswordRecovery} from "./Components/PasswordRecovery/PasswordRecovery";
import {NewPasswordEnter} from "./Components/NewPasswordEnter/NewPasswordEnter";
import {Test} from "./Components/Test/Test";
import {Error} from "./Components/Error/Error";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path={'/login'} render={() => <Login/>}/>
        <Route path={'/registration'} render={() => <Registration/>}/>
        <Route path={'/profile'} render={() => <Profile/>}/>
        <Route path={'/pas-recovery'} render={() => <PasswordRecovery/>}/>
        <Route path={'/pas-enter'} render={() => <NewPasswordEnter/>}/>
        <Route path={'/test'} render={() => <Test/>}/>
        <Route path={'/404'} render={() => <Error/>}/>
        <Redirect from={'*'} to={'/404'}/>
      </Switch>
    </div>
  );
}

export default App;
