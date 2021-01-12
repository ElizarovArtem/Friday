import React from "react";
import { useParams } from "react-router-dom";


interface ParamTypes {
  token: string
}


export const NewPasswordEnter = () => {

  let {token} = useParams<ParamTypes>()
  console.log(token)
  return (
    <div>
      <h1>Please enter new password</h1>
      <div>
        <label htmlFor="password">Enter new password</label>
        <input id="password" type="password" />
        <button>Send</button>
      </div>
    </div>
  );
};
