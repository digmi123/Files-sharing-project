import React from "react";
import File from "./File";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import FilesArea from "./FilesArea";


function FilesSection() {
  //Stats: 
  const [files, setFiles] = useState([]);


  //Methods:
  const changeHandler = (e) => {
    // console.log(e.target.files)
    console.log(e);
    setFiles([
      ...files,
      ...Array.from(e.target.files)
    ]);
    //setFiles(e.target.files);
    console.log(files);
    //console.log(files)
  };

  const submitHandler = async () => {
    const formData = new FormData();
    console.log(files);
    formData.append("files", files);
    try {
      let data = {};
      for (var pair of formData.entries()) {
        data[pair[0]] = pair[1];
        console.log(`key: ${pair[0]}, value: ${pair[1]}`);
      }
      //console.log(formData)
      await uploadFiles(formData);
    } catch (e) {
      console.log(e);
    }
  };

  const uploadFiles = async (data) => {
    const response = await axios.post({
      method: "post",
      url: "http://localhost:5000/test",
      data: data,
      // headers: { "Content-Type": "multipart/form-data" },
    });
    // if (response.status === 200) {
    //   console.log(response.data);
    // }
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

        <ActionButton variant="contained" onClick={()=>console.log(files)} >Download Selected</ActionButton>
        <ActionButton type="file" variant="contained">
          Select Files
        </ActionButton>
      </ActionsWrapper>

      {/* <hr width="100vw" /> */}

      <FilesContainer>
        <FilesArea/>
      </FilesContainer>
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
