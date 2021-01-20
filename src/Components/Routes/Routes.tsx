import React from "react";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import {Registration} from "../Registration/Registration";
import {Profile} from "../Profile/Profile";
import {Test} from "../Test/Test";
import {Error} from "../Error/Error";
import {Login} from "../Login/Login";
import PasswordRecoveryContainer from "../PasswordRecovery/PasswordRecoveryContainer";
import NewPasswordEnterContainer from "../NewPasswordEnter/NewPasswordEnterContainer";
import {Packs} from "../Packs/Packs";
import {Cards} from "../Cards/Cards";

export const ROUTE = {
    LOGIN: '/login',
    TEST: '/test',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    PAS_RECOVERY: '/pas-recovery',
    PAS_ENTER: '/pas-enter/:token',
    ERROR: '/404',
    PACKS: '/packs',
    CARDS: '/cards/:id'
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
                    <Route path={ROUTE.PAS_RECOVERY} render={() => <PasswordRecoveryContainer/>}/>
                    <Route path={ROUTE.PAS_ENTER} render={() => <NewPasswordEnterContainer/>}/>
                    <Route path={ROUTE.TEST} render={() => <Test/>}/>
                    <Route path={ROUTE.ERROR} render={() => <Error/>}/>
                    <Route path={ROUTE.PACKS} render={() => <Packs/>}/>
                    <Route path={ROUTE.CARDS} render={() => <Cards/>}/>
                    <Redirect from={'*'} to={ROUTE.ERROR}/>
                </Switch>
            </HashRouter>
        </div>
    )
}