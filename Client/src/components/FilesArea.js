import React,{useEffect} from 'react'
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import FilesSectionContextMenu from "./FilesSectionContextMenu";
import File from './File';
import {uploadFiles} from "../functions/files"
import { useDispatch} from "react-redux"
import {updateFilesData} from "../store/filesDataSlice"



function FilesArea({filesData , back , path}) {

  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPosition,setContextMenuPosition] = useState({x:0,y:0})
  const dispatch = useDispatch()

  const [folder,setFolder] = useState({open:false,data:{}})


  useEffect(()=>{
    const handleClik = ()=>{setShowContextMenu(false)}
    window.addEventListener('click',handleClik)
    return () => window.removeEventListener('click',handleClik)
  },[])


  const contextMenuHandler = (e) =>{
    e.preventDefault()
    setShowContextMenu(true)
    setContextMenuPosition({ x : e.pageX, y : e.pageY})
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
    uploadFiles(filesData,acceptedFiles);
    dispatch(updateFilesData())
    },
    noClick: true
  });

  const closeFolder = () =>{
    setFolder({open:false,data:{}})
  }
 
  if(folder.open)
  return(<FilesArea filesData={folder.data} back={closeFolder} path={path + filesData.name + "/"}/>)

  return (
    <FilesContainer onContextMenu={contextMenuHandler} {...getRootProps()} style={{ display: "flex"} }>
      
      <UpBar>
      <input {...getInputProps()} />
        <Button onClick={back}>back</Button>
        {path + filesData.name + "/"}
      </UpBar>
      {filesData.contains?.map((fileData) =>(<File key={fileData.type + fileData.id} info={fileData} setFolder={setFolder}/>))}
      {showContextMenu && <FilesSectionContextMenu position={contextMenuPosition}/>}
    </FilesContainer>
  );
}

export default FilesArea

const FilesContainer = styled.div`
  border: 1px solid black;
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;
`;

const test = styled.div`
  border: 1px solid red;
  width: 100%;
`;

const UpBar = styled.div`
width : 100%;
height : 40px;
border: 1px solid blue;
text-align: left;
`

const Button = styled.button`
  font-size: 1em;
  margin: 0.25em;
  padding: 0.25em 0.5em;
  width:10%;
  border: 2px solid #5499C7;
  border-radius: 3px;
  background: white;
  color: #5499C7;
  &:hover {
    background: #5499C7;
    color: white;
  }
`