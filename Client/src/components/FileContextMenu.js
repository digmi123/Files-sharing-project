import React,{useEffect} from "react";
import styled from "styled-components";
import {downloadFile,deleteFiles,deleteFolder} from "../functions/ApiCalls"
import {useDispatch} from "react-redux"
import {updateFilesData} from "../store/filesDataSlice"
import { useNavigate } from "react-router-dom";


function FileContextMenu({position, fileInfo ,functions, setContextMenu}){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
      const handleClik = ()=>{setContextMenu({show:false,x:0,y:0})}
      window.addEventListener('click',handleClik)
      return () => window.removeEventListener('click',handleClik)
    },[setContextMenu])

    const onDelete = async ()=>{
      if(fileInfo.type === "Folder"){
        await deleteFolder(fileInfo)
      }else{
        await deleteFiles(fileInfo);
      }
      dispatch(updateFilesData(navigate));
    }

    const onDownload = () => downloadFile(fileInfo)

    const onRefresh = () => dispatch(updateFilesData(navigate))
    if(!position.show) return(<></>)

    return(
        <Container position={position}>
            {
            fileInfo.type !== "Folder" ?
            (<>
            <Button onClick={onDownload}>Download</Button>
            </>)
            :
            (<>
            <Button onClick={functions.onOpen}>Open</Button>
            </>)
            }
            <Button onClick={onDelete}>Delete</Button>
            <Button onClick={functions.openEdit}>Edit</Button>
            <Button onClick={onRefresh}>Refresh</Button>

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