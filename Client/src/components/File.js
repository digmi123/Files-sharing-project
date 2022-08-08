import React,{useState} from "react";
import styled from "styled-components";
import {getIconByType} from "../FilesData";
import FileContextMenu from "./FileContextMenu";
import { IconContext } from "react-icons";
import EditFile from "./EditFile";
import {moveFile} from "../functions/ApiCalls"
import {useDispatch} from "react-redux"
import {updateFilesData} from "../store/filesDataSlice"

function File({ info , setFolder , move , setMove}) {
  const dispatch = useDispatch()
  const [contextMenu, setContextMenu] = useState({show:false,x:0,y:0})
  const [editOpen,setEditOpen] = useState(false)

  const contextMenuHandler = (e) =>{
    e.preventDefault()
    setContextMenu({show:true, x : e.pageX, y : e.pageY})
  }


  const Image = getIconByType(info.type)

  const handleOpen = () =>{
    if(info.type === "Folder")
      setFolder({open:true,data:info.id})
  }

  const openEdit = ()=>{setEditOpen(true)}

  const handleMouseDown = () =>{
    setMove({show:true, source:info})
  }

  const handleMouseUp = async () =>{
    if( info.type === "Folder" && move.source.id !== info.id){
      await moveFile(move.source,info.id);
      dispatch(updateFilesData());
    }
  }

  return (
    <FileInfo 
    onDoubleClick={handleOpen}
    onContextMenu={contextMenuHandler}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    >
      <IconContext.Provider value={{ color: 'black', size: '50px' }}>
        <Image alt="" />
        <FileName>{info.name}</FileName>
        </IconContext.Provider>
        <FileContextMenu position={contextMenu} fileInfo={info} functions={{handleOpen,openEdit}} setContextMenu={setContextMenu}/>
      {editOpen && <EditFile info={info} close={()=>{setEditOpen(false)}}/>}
    </FileInfo>
  );
}

export default File;

const FileInfo = styled.div`
  width : 100px;
  height: 100px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: flex-end;
  margin : 0.5em;
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

