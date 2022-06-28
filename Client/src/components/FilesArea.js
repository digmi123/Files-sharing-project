import React from 'react'
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios"
import styled from "styled-components";

const uploadFiles = async (files) => {
  const data = new FormData();
  data.append("logicalPath", "Popen");
  files.forEach(file => {
    data.append("files", file,file.name);
  });
  axios({
      method: 'post',
      url: 'http://localhost:5000/files/uploadFiles',
      data: data
  })
  .then(function (response) {
      console.log(response);
  })
  .catch(function (error) {
      console.log(error);
  });
  };


function FilesArea() {

     const { getRootProps, getInputProps } = useDropzone({
       onDrop: (acceptedFiles) => {
        uploadFiles(acceptedFiles);
       },
       noClick: true
     });


  return (
    <FilesContainer {...getRootProps()} style={{ display: "flex"}}>
      <input {...getInputProps()} />
      <DropZoneTitle>Drop files here</DropZoneTitle>
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

const DropZoneTitle = styled.p`
  width:100%
`;

