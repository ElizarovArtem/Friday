import React, {ChangeEvent, useState} from "react";
import s from './Login.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import { Redirect } from "react-router-dom";
import {IsLoadingValuesType, loginTC} from "../../store/login-reducer";
import SuperInputText from "../../SuperComponents/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../SuperComponents/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";


export const Login = () => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [rememberMe, setRememberMe] = useState(false)
    let [validateError, setValidateError] = useState<string | null>(null)
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const error = useSelector<AppRootStateType, string | null>(state => state.login.error)
    const isLoading = useSelector<AppRootStateType, IsLoadingValuesType>(state => state.login.isLoading)

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)
    const onChangeRememberMe = (e: ChangeEvent<HTMLInputElement>) => setRememberMe(e.currentTarget.checked)

    const onClickLogin = () => {
        if(email === "" || password === "") {
            setValidateError("Email or password required")
            return
        }
        dispatch(loginTC({email, password, rememberMe}))
    }
    const onKeyPress = () => {
        if(validateError != null) {
            setValidateError(null)
        }
    }

    if(isLoggedIn) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>LOGIN</h1>
            {isLoading === "loading" ? <div>Loading...</div> : null}
            <div className={s.loginForm}>
                <SuperInputText placeholder={"Email"} type={"email"} value={email} onKeyPress={onKeyPress} onChange={onChangeEmail}/>
                <SuperInputText placeholder={"Password"} type="password" value={password} onKeyPress={onKeyPress} onChange={onChangePassword}/>
                <SuperCheckbox type="checkbox" checked={rememberMe} onChange={onChangeRememberMe}/>
                <SuperButton disabled={isLoading === "loading" ? true : false} onClick={onClickLogin}>Log IN</SuperButton>
            </div>
            {error ? <div>{error}</div> : null}
            {validateError ? <div>{validateError}</div> : null}
        </div>
    )
}