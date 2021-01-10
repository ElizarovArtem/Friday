import React from "react";

export const NewPasswordEnter = () => {
  return (
    <div>
      <h1>NewPasswordEnter</h1>
      <div>
        <label htmlFor="email">Enter new password</label>
        <input id="email" type="password" />
        <button>Send</button>
      </div>
    </div>
  );
};
