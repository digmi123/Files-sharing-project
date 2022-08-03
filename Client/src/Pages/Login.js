import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import ReCAPTCHA from "react-google-recaptcha";
import API from "../ApiEndPonts";


function Login() {
  const navigate = useNavigate();
  const recaptchaRef = React.useRef();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e)=>{
    const recaptcha = recaptchaRef.current.execute();
    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("recaptcha", recaptcha);
    axios({
      method: 'post',
      url: API.users.login,
      data: data,
  })
  .then((response) => {
    localStorage.setItem("token", response.data.token);
    navigate("/")
  })
  .catch((error) => {
    console.log(error);
  });
  }

  return (
    <PageContainer>
      <LoginContainer>
        <Title>Login 🔒</Title>
        <LoginWrapper>
          <Fields>
            <Input
              onChange={handleChange}
              name="email"
              value={formData.email}
              placeholder={"Email"}
              email
            />
            <Input
              type="password"
              onChange={handleChange}
              name="password"
              value={formData.password}
              placeholder={"Password"}
            />
          </Fields>
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          />
          <Buttons>
            <SubmitButton onClick={handleSubmit}>Login</SubmitButton>
            <SubmitButton
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </SubmitButton>
          </Buttons>
        </LoginWrapper>
      </LoginContainer>
    </PageContainer>
  );
}

export default Login;

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgb(163, 190, 255);
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  background-color: rgb(159, 188, 255);
  border-radius: 8px;
  box-shadow: 6px 6px 10px #888888;
  width: 90vw;
  max-width: 450px;
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 70%;
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  justify-content: space-between;
  width: 100%;
`;

const Input = styled.input`
  height: 54px;
  padding: 20px 40px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 29px;
  box-sizing: border-box;
  background-color: white !important;
  background-repeat: no-repeat;
  width: 100%;
`;

const SubmitButton = styled.button`
  border-radius: 29px;
  background-color: rgb(55, 37, 255);
  color: white;
  font-size: 20px;
  font-weight: 600;
  border: none;
  margin-top: 30px;
  cursor: pointer;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  &:hover {
    background-color: #e32748;
  }
  padding: 10px 20px;
`;
