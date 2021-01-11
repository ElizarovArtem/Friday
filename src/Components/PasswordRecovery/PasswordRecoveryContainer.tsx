import React from "react";

export const PasswordRecovery = () => {
  return (
    <div>
      <h1>PasswordRecovery</h1>
      <div>
        <label htmlFor="email">Enter your Email</label>
        <input id="email" type="email" title="Email" />
        <button>Send</button>
      </div>
    </div>
  );
};
