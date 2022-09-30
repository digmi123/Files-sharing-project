import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ps } from "../API/ApiEndPonts";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { changePassword } from "../API/ApiCalls";

function PasswordRecovery() {
  const [passwordRequirements, setPasswordRequirements] = useState([]);
  const [requirementsIsOpen, setRequirementsIsOpen] = useState(true);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getPasswordRequirements();
  }, []);

  //Server requests:
  const getPasswordRequirements = async () => {
    const response = await axios(ps.getPs);
    if (response.status === 200) {
      setPasswordRequirements(response.data);
    }
  };

  const handleRequirements = () => {
    setRequirementsIsOpen(!requirementsIsOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("password recovery handle submit");
    changePassword(formData);
  };
  return (
    <PageContainer>
      <Container>
        <Title>Password recovery 🔒</Title>
        <PasswordRecoveryWrapper onSubmit={handleSubmit}>
          <Fields>
            <Input
              type="password"
              onChange={handleChange}
              name="password"
              placeholder={"New password"}
            />
            <Input
              type="password"
              onChange={handleChange}
              name="confirmPassword"
              placeholder={"Confirm password"}
            />
          </Fields>
          {passwordRequirements &&
            requirementsIsOpen &&
            Object.keys(passwordRequirements).reduce((filtered, key) => {
              if (passwordRequirements[key].require) {
                let re = new RegExp(passwordRequirements[key].regex);
                filtered.push(
                  <Alert
                    style={{
                      marginBottom: "10px",
                      borderRadius: "29px",
                    }}
                    key={key}
                    severity={re.test(formData.password) ? "success" : "error"}
                  >
                    {passwordRequirements[key].errorMessage}
                  </Alert>
                );
              }
              return filtered;
            }, [])}
          <Buttons>
            <Button
              onClick={handleRequirements}
              style={{ marginBottom: "15px", fontSize: "13px", width: "70%" }}
            >
              {requirementsIsOpen ? "Hide requirements" : "Show requirements"}
            </Button>
            <Button type="submit">RESET PASSWORD</Button>
          </Buttons>
        </PasswordRecoveryWrapper>
      </Container>
    </PageContainer>
  );
}

export default PasswordRecovery;

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
