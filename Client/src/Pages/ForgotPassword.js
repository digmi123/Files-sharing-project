import React, { useState } from "react";
import styled from "styled-components";
import { forgotPassword } from "../API/ApiCalls";

function ForgotPass() {
  const [email, setEmail] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    forgotPassword(data);
  };

  const handleChange = (e) => {
    setEmail(e.target);
  };

  return (
    <PageContainer>
      <Container onSubmit={handleSubmit}>
        <Title>Forgot password</Title>
        <PasswordRecoveryWrapper onSubmit={handleSubmit}>
          <Fields>
            <Input
              type="email"
              onChange={handleChange}
              name="email"
              placeholder={"Please enter ypur email"}
            />
          </Fields>
          <Buttons>
            <Button type="submit">SEND EMAIL</Button>
          </Buttons>
        </PasswordRecoveryWrapper>
      </Container>
    </PageContainer>
  );
}

export default ForgotPass;

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgb(163, 190, 255);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  background-color: rgb(159, 188, 255);
  border-radius: 8px;
  border: 1px solid black;
  width: 90vw;
  max-width: 450px;
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

const PasswordRecoveryWrapper = styled.form`
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
  width: 100%;
  align-items: center;
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
  margin-top: 10px;
  cursor: pointer;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  &:hover {
    background-color: #e32748;
  }
  padding: 10px 20px;
`;
