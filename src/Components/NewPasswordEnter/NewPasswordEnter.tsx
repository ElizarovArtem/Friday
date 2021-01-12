import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { ROUTE } from "../Routes/Routes";


interface ParamTypes {
  token: string
}

type NewPasswordEnterType = {
  newPassword: string
  error: string
  succes: boolean
  changePassword: (value: string) => void
  sendNewPassword: (pas: string, token: string) => void
}

export const NewPasswordEnter = (props:NewPasswordEnterType) => {

  let {token} = useParams<ParamTypes>()
  
  const onChangeNewPass = (e: React.ChangeEvent<HTMLInputElement>) =>{
    props.changePassword(e.currentTarget.value)
  }

  const onSendNewPass = () => {
    props.sendNewPassword(props.newPassword, token)
  }

  if(props.succes) {
    return <Redirect to ={ROUTE.LOGIN} />
  }

  return (
    <div>
      <h1>Please enter new password</h1>
      {props.error && props.error}
      <div>
        <label htmlFor="password">Enter new password</label>
        <input onChange={onChangeNewPass} value={props.newPassword} id="password" type="password" />
        <button onClick={onSendNewPass}>Send</button>
      </div>
    </div>
  );
};
