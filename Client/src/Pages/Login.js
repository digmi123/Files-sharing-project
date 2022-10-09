import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { users } from "../API/ApiEndPonts";
import { getProjectsList } from "../API/ApiCalls";

function Login() {
  const navigate = useNavigate();
  const recaptchaRef = React.useRef();

  useEffect(() => {
    getProjectsList(() => {
      navigate("/projects");
    });
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const recaptcha = recaptchaRef.current.execute();
    data.append("recaptcha", recaptcha);
    axios({ ...users.login, data })
      .then((response) => {
        localStorage.setItem("access-token", response.data.token);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <PageContainer>
      <LoginContainer>
        <Title>Login 🔒</Title>
        <LoginWrapper onSubmit={handleSubmit}>
          <Fields>
            <Input type="text" name="email" placeholder={"Email"} />
            <Input type="password" name="password" placeholder={"Password"} />
          </Fields>
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          />
          <Buttons>
            <Button type="submit">Login</Button>
            <Button
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </Button>
          </Buttons>
          <Link href="/forgotpass">Forgot password?</Link>
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

const Link = styled.a``;

const LoginWrapper = styled.form`
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

const Button = styled.button`
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
