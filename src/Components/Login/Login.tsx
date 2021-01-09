import React, {ChangeEvent, useState} from "react";
import s from './Login.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import { Redirect } from "react-router-dom";
import { loginTC } from "../../store/login-reducer";


export const Login = () => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [rememberMe, setRememberMe] = useState(false)
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const error = useSelector<AppRootStateType, string>(state => state.login.error)

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)
    const onChangeRememberMe = (e: ChangeEvent<HTMLInputElement>) => setRememberMe(e.currentTarget.checked)

    const onClickLogin = () => {
        dispatch(loginTC({email, password, rememberMe}))
    }

    if(isLoggedIn) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <div className={s.loginForm}>
                <label >Email: <input type={"email"} value={email} onChange={onChangeEmail}/></label>
                <label>Password: <input type="password" value={password} onChange={onChangePassword}/></label>
                <label>Remember me: <input type="checkbox" checked={rememberMe} onChange={onChangeRememberMe}/></label>
                <button onClick={onClickLogin}>Log IN</button>
            </div>
            {error ? <div>{error}</div> : null}
        </div>
    )
}