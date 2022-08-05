import React from "react";
import styled from "styled-components";
import {downloadFile,deleteFiles} from "../functions/files"



function FileContextMenu({position, fileInfo ,updateFilesData }){
    console.log(`blue (${position.x},${position.y})`);
    return(
        <Container position={position}>
            {fileInfo.type !== "Folder" ?(<>
            <Button onClick={()=>downloadFile(fileInfo)}>Download</Button>
            <Button onClick={()=>deleteFiles(fileInfo,updateFilesData)}>Delete</Button>
            </>)
            :
            (<>
            <Button onClick={()=>console.log(fileInfo)}>Open</Button>
            </>)}
            <Button onClick={()=>updateFilesData()}>refresh</Button>
        </Container>
    )
}

const Container = styled.div`
  z-index:10;
  background-color:#fff;
  border: 2px solid #5499C7;
  max-width:140px;
  border-radius: 5px;
  box-sizing: border-box;
  position: absolute;
  top:${props => props.position.y}px;
  left:${props => props.position.x}px;
`;

const Button = styled.button`
  font-size: 1em;
  margin: 0.25em;
  padding: 0.25em 0.5em;
  width:90%;
  border: 2px solid #5499C7;
  border-radius: 3px;
  background: white;
  color: #5499C7;
  &:hover {
    background: #5499C7;
    color: white;
  }
`

export default FileContextMenu;