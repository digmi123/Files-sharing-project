import React from 'react'
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import FilesSectionContextMenu from "./FilesSectionContextMenu";
import File from './File';
import {moveFile, uploadFiles, updateFilesData} from "../functions/ApiCalls"
import { useDispatch} from "react-redux"
import ShadowFile from './ShadowFile';
import { useNavigate } from "react-router-dom";


function FilesArea({filesData , back , path , setCurrentFolder}) {

  const dispatch = useDispatch()
  const [contextMenu, setContextMenu] = useState({show:false,x:0,y:0})
  const [folder,setFolder] = useState({open:false,data:0})
  const [move,setMove] = useState({show:false, source:null})
  const navigate = useNavigate()

  const contextMenuHandler = (e) =>{
    e.preventDefault()
    setContextMenu({show:true, x : e.pageX, y : e.pageY})
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
    await uploadFiles(filesData,acceptedFiles);
    dispatch(updateFilesData(navigate))
    },
    noClick: true
  });

  const closeFolder = () =>{
    setFolder({open:false,data:0})
  }

  const handleBackMouseUp = async () =>{
    if(move.source != null && filesData.parent_id){
      await moveFile(move.source,filesData.parent_id);
      dispatch(updateFilesData(navigate));
    }
  }
 
  if(folder.open)
  return(<FilesArea 
    filesData={filesData.contains.find((item) => item.id === folder.data)} 
    back={closeFolder} path={path + filesData.name + "/"} 
    setCurrentFolder={setCurrentFolder}/>)

  setCurrentFolder(filesData)
  return (
    <>
    <FilesContainer onContextMenu={contextMenuHandler} {...getRootProps()} style={{ display: "flex"} }>
      <UpperBar>
      <input {...getInputProps()} />
        <Button onMouseUp={handleBackMouseUp} onClick={back}>back</Button>
        {path + filesData.name + "/"}
      </UpperBar>
      {filesData.contains?.map((fileData) =>(<File key={fileData.type + fileData.id} info={fileData} setFolder={setFolder} move={move} setMove={setMove}/>))}
    </FilesContainer>
    <FilesSectionContextMenu position={contextMenu} filesData={filesData} setContextMenu={setContextMenu}/>
    <ShadowFile info={move} setMove={setMove}/>
    </>
  );
}

export default FilesArea

const FilesContainer = styled.div`
  border: 1px solid black;
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  min-height: 10em;
`;


const UpperBar = styled.div`
width : 100%;
height : 40px;
border: 1px solid blue;
text-align: left;
`

const Button = styled.button`
  font-size: 1em;
  margin: 0.25em;
  padding: 0.25em 0.5em;
  width:5em;
  border: 2px solid #5499C7;
  border-radius: 3px;
  background: white;
  color: #5499C7;
  &:hover {
    background: #5499C7;
    color: white;
  }
`