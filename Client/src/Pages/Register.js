import React, { useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    // const [passwordError, setPasswordErr] = useState("");
    // const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [passwordRequirements, setPasswordRequirements] = useState();
    const [requirementsIsOpen, setRequirementsIsOpen] = useState(true);

    useEffect(async () => {
        setPasswordRequirements(await getPasswordRequirements());
    }, []);

    //Server requests:
    const getPasswordRequirements = async () => {
      const response = await axios.get(
        "http://localhost:5000/passwordRequirements/getPasswordRequirements"
      );
      if (response.status === 200) {
        return response.data;
      }
    };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleRequirements = () =>{
      setRequirementsIsOpen(!requirementsIsOpen);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PageContainer>
      <RegisterContainer>
        <Title>Register 🔒</Title>
        <RegisterWrapper>
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
            <Input
              type="password"
              onChange={handleChange}
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder={"Confirm Password"}
            />

            <SubmitButton
              onClick={handleRequirements}
              style={{ marginBottom: "15px", fontSize: "13px" , width: "70%"}}
            >
              {requirementsIsOpen ? "Hide requirements" : "Show requirements"}
            </SubmitButton>

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
                      // severity={re.test(userPassword) ? "success" : "error"}
                      severity={
                        re.test(formData.password) ? "success" : "error"
                      }
                    >
                      {passwordRequirements[key].errorMessage}
                    </Alert>
                  );
                }
                return filtered;
              }, [])}
          </Fields>

          <Buttons>
            <SubmitButton>Register</SubmitButton>
            <SubmitButton onClick = {()=>{navigate("/login")}}>Login</SubmitButton>
          </Buttons>
        </RegisterWrapper>
      </RegisterContainer>
    </PageContainer>
  );
}

export default Register;

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgb(163, 190, 255);
`;

const RegisterContainer = styled.div`
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

const RegisterWrapper = styled.div`
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
  align-items: center;
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
