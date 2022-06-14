import React from "react";
import filesData from "../FilesData";
import TreeItem from "./TreeItem";
import styled from "styled-components";

function FileTree({ contains }) {
  return (
    <Container>
      {contains &&
        contains.map((file, index) => {
          return <TreeItem key={index} info={file} />;
        })}
    </Container>
  );
}

export default FileTree;

const Container = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 10px;
  font-size: 1.3rem;
`;
