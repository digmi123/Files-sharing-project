import React from "react";
import { forgotPassword } from "../API/ApiCalls";

function forgotPass() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    forgotPassword(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Enter your email here" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default forgotPass;
