import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {getIconByType} from "../FilesData";
import FileContextMenu from "./FileContextMenu";

function File({ info , updateFilesData }) {
  const [showContextMenu, setShowcontextMenu] = useState(false)
  const [contextMenuPosition,setContextMenuPosition] = useState({x:0,y:0})

  useEffect(()=>{
    const handleClik = ()=>{setShowcontextMenu(false)}
    window.addEventListener('click',handleClik)
    return () => window.removeEventListener('click',handleClik)
  },[])

  const contextMenuHandler = (e) =>{
    e.preventDefault()
    setShowcontextMenu(true)
    setContextMenuPosition({ x : e.pageX, y : e.pageY})
  }

  const Image = styled(getIconByType(info.type))`
    font-size: 60px;
  `;

  return (
    <FileCard onContextMenu={contextMenuHandler}>
      <CheckBox type="checkbox" name={info.fileName} />
      <FileInfo>
        <Image alt="" />
        <FileName>{info.name}</FileName>
      </FileInfo>
      {showContextMenu && <FileContextMenu position={contextMenuPosition} fileInfo={info} updateFilesData={updateFilesData}/>}
    </FileCard>
  );
}

export default File;

const FileCard = styled.div`
 border: 1px solid black;
 display: flex;
  flex-direction: column;
`;

const FileName = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

const CheckBox = styled.input`
  position: absolute;
  top: -2px;
  right: -4px;
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: flex-end;
  margin-right: 30px;
  margin-left: 30px;
  position: relative;
  border: 1px solid red;
`;