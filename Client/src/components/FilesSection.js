import React,{ useState } from "react";
import styled from "styled-components";
import FilesArea from "./FilesArea";
import {uploadFiles , updateFilesData} from "../functions/ApiCalls"
import {useSelector , useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";


function FilesSection() {
  const dispatch = useDispatch()
  //Stats: 
  let {filesData} = useSelector(state => state.filesData)
  const [files, setFiles] = useState([]);
  const [currentFolder,setCurrentFolder] = useState([]);
  const navigate = useNavigate()
  
  //Methods:
  const changeHandler = (e) => {
    setFiles([
      ...files,
      ...Array.from(e.target.files)
    ]);
  };

  const submitHandler = async () => {
    await uploadFiles(currentFolder,files);
    dispatch(updateFilesData(navigate))
  };


  return (
    <Container>
      <ActionsWrapper>
        {/* 3 Buttoons */}
        <FilesSelectionContainer>
          <FilesInput
            type="file"
            name="file"
            onChange={changeHandler}
            multiple="multiple"
          />
        </FilesSelectionContainer>
      </ActionsWrapper>
      {/* <hr width="100vw" /> */}
        <FilesArea filesData={filesData} back={()=>{console.log("in root")} } path="" setCurrentFolder={setCurrentFolder}/>
    </Container>
  );
}

export default FilesSection;

const Container = styled.div`
  flex: 0.8;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ActionsWrapper = styled.div`
  display: flex;
  margin: 10px;
  height: 100px;
  align-items: center;
`;

const FilesInput = styled.input`
`;

const FilesSelectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  font-size: 1em;
  margin: 0.25em;
  padding: 0.25em 0.5em;
  border: 2px solid #5499C7;
  width: 20%;
  height: 20%;
  border-radius: 3px;
  background: white;
  color: #5499C7;
  &:hover {
    background: #5499C7;
    color: white;
  }
`