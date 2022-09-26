import React from "react";
import axios from "axios";
import { users } from "../API/ApiEndPonts";

function forgotPassword() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post({ ...users.forgotPassword, data })
      // {
      //   email: data.get("email"),
      // }
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form>
      <input>Enter your email here</input>
      <button onClick={handleSubmit}></button>
    </form>
  );
}

export default forgotPassword;
