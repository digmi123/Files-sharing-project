import React, { useState, useEffect} from "react";
import styled from "styled-components";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {users, ps} from "../API/ApiEndPonts";
import ReCAPTCHA from "react-google-recaptcha";

function Register() {

    const navigate = useNavigate();
    const recaptchaRef = React.useRef();
    const [passwordRequirements, setPasswordRequirements] = useState([]);
    const [requirementsIsOpen, setRequirementsIsOpen] = useState(true);

    useEffect(() => {
      getPasswordRequirements()
    }, []);

    //Server requests:
    const getPasswordRequirements = async () => {
      const response = await axios(ps.getPs);
      if (response.status === 200) {
        setPasswordRequirements(response.data)
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

  const handleSubmit = (e)=>{
    if(formData.password !== formData.confirmPassword){
      return 
    }
    const recaptcha = recaptchaRef.current.execute();
    e.preventDefault()
    const data = new FormData(e.target)
    data.append("recaptcha", recaptcha);
    axios({...users.register, data })
  .then((response) => {
    navigate("/login");
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
  }

  return (
    <PageContainer>
      <RegisterContainer>
        <Title>Register 🔒</Title>
        <RegisterWrapper onSubmit={handleSubmit}>
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

            <Button
              onClick={handleRequirements}
              style={{ marginBottom: "15px", fontSize: "13px" , width: "70%"}}
            >
              {requirementsIsOpen ? "Hide requirements" : "Show requirements"}
            </Button>

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
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          />
          <Buttons>
            <Button type="submit">Register</Button>
            <Button onClick = {()=>{navigate("/login")}}>Login</Button>
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

const RegisterWrapper = styled.form`
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
