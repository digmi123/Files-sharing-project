import React from 'react'
import Uppy from "@uppy/core";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios"
import Tus from "@uppy/tus";
import { DragDrop } from "@uppy/react";

const uppy = new Uppy({
  meta: { type: "avatar" },
  //restrictions: { maxNumberOfFiles: 1 },
  autoProceed: true,
});

//uppy.use(Tus, { endpoint: "./" });

uppy.on("complete", (result) => {
  console.log("Drage completed");
});


const uploadFile = async (filesToUpload) => {

    const formData = new FormData();
    formData.append("files", filesToUpload);

    const res = await axios.post({
      method: "post",
      url: "http://localhost:5000/test",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(res);
}


function FilesArea() {

     const { getRootProps, getInputProps } = useDropzone({
       accept: "image/*",
       onDrop: (acceptedFiles) => {
        uploadFile(acceptedFiles);
         console.log(acceptedFiles);
       },
     });


  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drop files here</p>

    </div>
  );
}

export default FilesArea