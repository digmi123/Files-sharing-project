import React from "react";
import styled from "styled-components";
import {createFolder} from "../functions/ApiCalls"
import {useDispatch} from "react-redux"
import {updateFilesData} from "../store/filesDataSlice"


function FilesSectionContextMenu({position , filesData}){
    const dispatch = useDispatch()

    const onNewFolder = async () =>{
        await createFolder(filesData)
        dispatch(updateFilesData());
    }

    return(
        <Container position={position}>
            <Button onClick={onNewFolder}>New Folder</Button>
        </Container>
    )
}

const Container = styled.div`
  z-index:9;
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


export default FilesSectionContextMenu;