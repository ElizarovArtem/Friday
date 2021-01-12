import React, { ChangeEvent } from "react";
import { Redirect } from "react-router-dom";
import { ROUTE } from "../Routes/Routes";
import style from "./PasswordRecovery.module.css"

type PasswordRecoveryType = {
  error: string
  email: string
  emailSended: boolean
  sendRecoveryMess: (email: string) => void
  addUserEmail: (email: string) => void
}


export const PasswordRecovery: React.FC<PasswordRecoveryType> = ({error, email, emailSended, sendRecoveryMess, addUserEmail}) => {
  
  const addEmail = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value &&  addUserEmail(e.currentTarget.value)
  }

  
  const sendEmail = () => {
    sendRecoveryMess(email);
  }
  
  if(!emailSended && error) {
    return <Redirect to={'/pas-enter/error'}/>
  }

  return (
    <div>
      <h1>PasswordRecovery</h1>
      <div className = {style.container}>
        {error && <p className = {style.error}>{error}</p>}
        <label htmlFor="email">Enter your Email</label>
        <input onChange={addEmail} id="email" type="email" title="Email" />
        <button className = {style.button} onClick = {sendEmail} >Send</button>
      </div>
    </div>
  );
};
