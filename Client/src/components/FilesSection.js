import React, { useState } from "react";
import styled from "styled-components";
import FilesArea from "./FilesArea";
import {uploadFiles , updateFilesData} from "../API/ApiCalls"
import {useSelector , useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function FilesSection() {
  const dispatch = useDispatch();
  //Stats:
  let { filesData } = useSelector((state) => state.filesData);
  const [files, setFiles] = useState([]);
  const [currentFolder, setCurrentFolder] = useState([]);
  const hiddenFileInput = React.useRef(null);
  const navigate = useNavigate();

  //had a warning cannot render a comp while ...
  //The solution on internet was to inser into useEffect the function were getting from props.
  //Were not getting function so just log fixed it need to think what to do :(  .
  useEffect(()=>{
    console.log(":fgdgdgdf");
  }, [files])

  //Methods:
  const changeHandler = (e) => {
    console.log("Im on the change handler of the hidden input.");
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  const submitHandler = async () => {
    await uploadFiles(currentFolder, files);
    dispatch(updateFilesData(navigate));
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <Container>
      <ActionsWrapper>
        {/* 3 Buttoons */}
        <FilesSelectionContainer>
          <Button onClick={handleClick}>Upload a file</Button>
          <FilesInput
            type="file"
            name="file"
            ref={hiddenFileInput}
            onChange={changeHandler}
            multiple="multiple"
            style={{ display: "none" }}
          />
        </FilesSelectionContainer>
      </ActionsWrapper>
      {/* <hr width="100vw" /> */}
        <FilesArea filesData={filesData} back={()=>{navigate("/projects")}} path="" setCurrentFolder={setCurrentFolder}/>
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

const FilesInput = styled.input``;

const FilesSelectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  transition: 0.5s all ease-out;
  font-size: 1em;
  margin: 0.25em;
  padding: 0.25em 0.5em;
  border: 2px solid #5499c7;
  height: 20%;
  border-radius: 3px;
  background: white;
  color: #5499c7;
  &:hover {
    background: #5499c7;
    color: white;
  }
`;
