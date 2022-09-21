import React from 'react'
import styled from "styled-components";
import ProjectsList from '../components/ProjectsList';

function Projects() {

  return (
    <Container>
      <ProjectsList />
    </Container>
  );
}

export default Projects


const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;