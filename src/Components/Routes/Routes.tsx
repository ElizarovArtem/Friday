import React from "react";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import {Registration} from "../Registration/Registration";
import {Profile} from "../Profile/Profile";
import {PasswordRecovery} from "../PasswordRecovery/PasswordRecovery";
import {NewPasswordEnter} from "../NewPasswordEnter/NewPasswordEnter";
import {Test} from "../Test/Test";
import {Error} from "../Error/Error";
import {Login} from "../Login/Login";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";

export const ROUTE = {
    LOGIN: '/login',
    TEST: '/test',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    PAS_RECOVERY: '/pas-recovery',
    PAS_ENTER: '/pas-enter',
    ERROR: '/404'
}

export const Routes = () => {

    return (
        <div>
            <HashRouter>
                <Switch>
                    <Route path={"/"} exact render={() => <Redirect to={ROUTE.TEST}/>}/>
                    <Route path={ROUTE.LOGIN} render={() => <Login/>}/>
                    <Route path={ROUTE.REGISTRATION} render={() => <Registration/>}/>
                    <Route path={ROUTE.PROFILE} render={() => <Profile/>}/>
                    <Route path={ROUTE.PAS_RECOVERY} render={() => <PasswordRecovery/>}/>
                    <Route path={ROUTE.PAS_ENTER} render={() => <NewPasswordEnter/>}/>
                    <Route path={ROUTE.TEST} render={() => <Test/>}/>
                    <Route path={ROUTE.ERROR} render={() => <Error/>}/>
                    <Redirect from={'*'} to={ROUTE.ERROR}/>
                </Switch>
            </HashRouter>
        </div>
    )
}