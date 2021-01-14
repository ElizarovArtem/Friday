import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SuperInputText from "../../SuperComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";
import {registerUserTC, setRegisteredUserAC} from "../../store/registration-reducer";
import {AppRootStateType} from "../../store/store";
import { Redirect } from "react-router-dom";


export const Registration = () => {
    const [data, setData] = useState<DataRegistrationType>({
        email: '',
        password: '',
        repeatPassword: ''
    })
    const dispatch = useDispatch()
    const isNewUser = useSelector<AppRootStateType, boolean>(state => state.registration.isNewUser)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name
        for (let key in data) {
            if (key === fieldName) {
                setData({...data, [key]: e.currentTarget.value})
            }
        }
    }
    const onSubmitRegistration = () => {
        data.password === data.repeatPassword
        && dispatch(registerUserTC({email: data.email, password: data.password}))
        setData({email: '', password: '', repeatPassword: ''})
    }

    if (isNewUser) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div>
            <h1>Registration</h1>
            <div style={{margin: '5px'}}>
                <SuperInputText placeholder={'email'}
                                name={'email'}
                                value={data.email}
                                onChange={onChangeHandler}
                />
            </div>
            <div style={{margin: '5px'}}>
                <SuperInputText placeholder={'password'}
                                name={'password'}
                                value={data.password}
                                onChange={onChangeHandler}
                />
            </div>
            <div style={{margin: '5px'}}>
                <SuperInputText placeholder={'repeat password'}
                                name={'repeatPassword'}
                                value={data.repeatPassword}
                                onChange={onChangeHandler}
                />
            </div>
            <div style={{margin: '5px'}}>
                <SuperButton onClick={onSubmitRegistration}>Register</SuperButton>
            </div>
        </div>
    )
}

//types
export type DataRegistrationType = {
    email: string
    password: string
    repeatPassword?: string
}