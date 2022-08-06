import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {getIconByType} from "../FilesData";
import FileContextMenu from "./FileContextMenu";
import { IconContext } from "react-icons";
import EditFile from "./EditFile";

function File({ info , setFolder }) {
  const [showContextMenu, setShowcontextMenu] = useState(false)
  const [contextMenuPosition,setContextMenuPosition] = useState({x:0,y:0})
  const [editOpen,setEditOpen] = useState(false)

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


  const Image = getIconByType(info.type)

  const onOpen = () =>{
    if(info.type === "Folder")
      setFolder({open:true,data:info})
  }

  

  return (
    // <FileCard  >
      <FileInfo onDoubleClick={onOpen} onContextMenu={contextMenuHandler}>
      <IconContext.Provider value={{ color: 'black', size: '50px' }}>
        <Image alt="" />
        <FileName>{info.name}</FileName>
        </IconContext.Provider>
        {showContextMenu && <FileContextMenu position={contextMenuPosition} fileInfo={info} onOpen={onOpen} openEdit={()=>{setEditOpen(true)}}/>}
      {editOpen && <EditFile info={info} close={()=>{setEditOpen(false)}}/>}
      </FileInfo>
    //  </FileCard>
  );
}

export default File;

const FileCard = styled.div`
 border: 1px solid black;
 display: flex;
  flex-direction: column;
`;

const FileName = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;


const FileInfo = styled.div`
  width : 100px;
  height: 100px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: flex-end;
  margin : 1em;
`;