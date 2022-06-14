import React from 'react'
import styled from "styled-components";
import FileTree from "./FileTree";
import FilesData from "../FilesData";

function Sidebar() {
  return (
    <Container>
      I am a SideBar
      <FileTree contains={FilesData} />
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  flex: 0.2;
`;