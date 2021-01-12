import React from "react";
import { useParams } from "react-router-dom";

export const NewPasswordEnter = () => {

  const param = useParams()
  console.log(param)
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
