import React from "react";
import styled from "styled-components";


function FilesSectionContextMenu({position}){
    console.log(`red (${position.x},${position.y})`);
    return(
        <Container position={position}>
            <p>FilesSectionContextMenu</p>
        </Container>
    )
}

const Container = styled.div`
  border-radius: 5px;
  box-sizing: border-box;
  position: absolute;
  background-color:red;
  top:${props => props.position.y}px;
  left:${props => props.position.x}px;
`;


export default FilesSectionContextMenu;