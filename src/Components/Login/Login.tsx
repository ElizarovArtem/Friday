import React, {ChangeEvent, useState} from "react";
import s from './Login.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import { Redirect } from "react-router-dom";
import {IsLoadingValuesType, loginTC} from "../../store/login-reducer";


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
        const EmailReg = /\S+@\S+\.\S+/;
        if(EmailReg.test(email) && password.length > 2){
            dispatch(loginTC({email, password, rememberMe}))
        } else if(!EmailReg.test(email)){
            setValidateError("Email is not valid")
        } else if(!(password.length > 2)){
            setValidateError("Password length must be more than 2 symbols")
        }
        
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
                <label >Email: <input type={"email"} value={email} onKeyPress={onKeyPress} onChange={onChangeEmail}/></label>
                <label>Password: <input type="password" value={password} onKeyPress={onKeyPress} onChange={onChangePassword}/></label>
                <label>Remember me: <input type="checkbox" checked={rememberMe} onChange={onChangeRememberMe}/></label>
                <button disabled={isLoading === "loading" ? true : false} onClick={onClickLogin}>Log IN</button>
            </div>
            {error ? <div>{error}</div> : null}
            {validateError ? <div>{validateError}</div> : null}
        </div>
    )
}