import React from "react";
import styled from "styled-components";
import logo from "../assets/CloudLogo.png";

function NavBar() {
  return (
    <Container>
      <LogoSection>
        <Logo src={logo} alt=""></Logo>
      </LogoSection>
      <ListContainer>
        <ListItem>Test1</ListItem>
        <ListItem>Test2</ListItem>
        <ListItem>Test3</ListItem>
      </ListContainer>
      <Button>Log out</Button>
    </Container>
  );
}

export default NavBar;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const LogoSection = styled.div`
`;

const Logo = styled.img`
  ;
`;

const ListContainer = styled.ul`
  display: flex;
  list-style: none;
  gap: 1rem;
`;

const ListItem = styled.li`
  font-size: 1.2rem;
  padding: 0.3rem;
  text-transform: uppercase;
  border-radius: 5%;
  cursor: pointer;
  text-decoration: none;
  font-weight: 400;
  transition: 0.1s ease-in-out;
  color: #5499c7;
  &:hover {
    background: #5499c7;
    color: white;
  }
`;

const Button = styled.button` 
  height: 60%;
  font-size: 1.2rem;
  padding: 0.3rem;
  text-transform: uppercase;
  border-color: #5499c7;
  border-radius: 5%;
  cursor: pointer;
  text-decoration: none;
  font-weight: 400;
  transition: 0.1s ease-in-out;
  color: #5499c7;
  &:hover {
    background: #5499c7;
    color: white;
  }
`;
