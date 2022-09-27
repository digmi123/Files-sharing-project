import React from "react";
import TreeItem from "./TreeItem";
import styled from "styled-components";

function FileTree({contains}) {
    return (
        <Container>
            {contains &&
                contains.map((file, index) => {
                    return <TreeItem key={index} info={file}/>;
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
  padding-left: 1em;
  font-size: 1rem;
  text-align: left;
`;
