import React,{useEffect} from 'react'
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import FilesSectionContextMenu from "./FilesSectionContextMenu";
import File from './File';
import {uploadFiles} from "../functions/files"



function FilesArea({filesData,updateFilesData}) {

  const [showContextMenu, setShowcontextMenu] = useState(false)
  const [contextMenuPosition,setContextMenuPosition] = useState({x:0,y:0})


  useEffect(()=>{
    const handleClik = ()=>{setShowcontextMenu(false)}
    window.addEventListener('click',handleClik)
    console.log(filesData);
    return () => window.removeEventListener('click',handleClik)
  },[])


  const contextMenuHandler = (e) =>{
    e.preventDefault()
    setShowcontextMenu(true)
    setContextMenuPosition({ x : e.pageX, y : e.pageY})
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
    uploadFiles(filesData,acceptedFiles,updateFilesData);
    },
    noClick: true
  });


  return (
    <FilesContainer onContextMenu={contextMenuHandler} {...getRootProps()} style={{ display: "flex"} }>
    {/* // <FilesContainer {...getRootProps()} style={{ display: "flex"} }> */}
      <input {...getInputProps()} />
      {filesData.contains?.map(fileData =>(<File id={fileData.name} info={fileData} updateFilesData={updateFilesData} />))}
      {showContextMenu && <FilesSectionContextMenu position={contextMenuPosition}/>}
    </FilesContainer>
  );
}

export default FilesArea

const FilesContainer = styled.div`
  border: 1px solid black;
  height: 60%;
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;
`;

