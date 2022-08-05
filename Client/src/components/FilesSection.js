import React,{ useState } from "react";
import styled from "styled-components";
import FilesArea from "./FilesArea";
import {uploadFiles} from "../functions/files"



function FilesSection({filesData,updateFilesData}) {
  //Stats: 
  const [files, setFiles] = useState([]);

  
  //Methods:
  const changeHandler = (e) => {
    console.log(e);
    setFiles([
      ...files,
      ...Array.from(e.target.files)
    ]);
  };

  const submitHandler = async () => {
    // uploadFiles(filesData,files,updateFilesData);
  };


  return (
    <Container>
      <ActionsWrapper>
        {/* 3 Buttoons */}
        <FilesSelectionContainer>
          <input
            type="file"
            name="file"
            onChange={changeHandler}
            multiple="multiple"
          />
          <ActionButton variant="contained" onClick={submitHandler}>
            Upload Files
          </ActionButton>
        </FilesSelectionContainer>

        <ActionButton variant="contained" >
          Download Selected
        </ActionButton>
        <ActionButton type="file" variant="contained">
          Select Files
        </ActionButton>
      </ActionsWrapper>

      {/* <hr width="100vw" /> */}
        <FilesArea filesData={filesData} updateFilesData={updateFilesData}/>
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

const FilesSelectionContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const ActionButton = styled.button`
  margin-right: 10px !important;
  background-color: white !important;
  width: 25%;
  height: 50px;
  cursor: pointer;
  border-radius: 60px;
  &:hover {
    background-color: rgb(49, 134, 99) !important;
  }
`;

const FilesContainer = styled.div`
  border: 1px solid black;
  height: 60%;
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;
`;
