import React from 'react'
import styled from "styled-components";
import FileTree from "./FileTree";
import { useSelector } from "react-redux"

function Sidebar() {
  let { filesData } = useSelector(state => state.filesData)
  return (
    <Container>
      I am a SideBar
      <FileTree contains={filesData.contains} />
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  flex: 0.2;
`;