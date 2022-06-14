import React from 'react'
import Sidebar from '../components/Sidebar'
import FilesSection from '../components/FilesSection'
import styled from "styled-components";

function Home() {
  return (
    <HomeContainer>
      {/* files section*/}
      <FilesSection />
      <hr width="1" size="800" />
      {/* folders bar on left */}
      <Sidebar />
    </HomeContainer>
  );
}

export default Home

const HomeContainer = styled.div`
  display: flex;
  width: 100%;
`;