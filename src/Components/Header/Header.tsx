import React from "react";
import {NavLink} from 'react-router-dom'
import {ROUTE} from "../Routes/Routes";
import s from './Header.module.css'


export const Header = () => {
    return (
        <div>
            <ul className={s.list}>
                <li><NavLink className={s.link} to={ROUTE.LOGIN}>LOGIN</NavLink></li>
                <li><NavLink className={s.link} to={ROUTE.REGISTRATION}>REGISTRATION</NavLink></li>
                <li><NavLink className={s.link} to={ROUTE.PROFILE}>PROFILE</NavLink></li>
                <li><NavLink className={s.link} to={ROUTE.PAS_RECOVERY}>FORGOT</NavLink></li>
                <li><NavLink className={s.link} to={ROUTE.TEST}>TEST</NavLink></li>
            </ul>
        </div>
    )
}