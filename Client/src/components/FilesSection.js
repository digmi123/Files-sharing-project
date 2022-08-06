import React,{ useState ,useEffect } from "react";
import styled from "styled-components";
import FilesArea from "./FilesArea";
import {uploadFiles} from "../functions/ApiCalls"
import {useSelector , useDispatch} from "react-redux"
import {updateFilesData} from "../store/filesDataSlice"


function FilesSection() {
  const dispatch = useDispatch()
  //Stats: 
  let {filesData} = useSelector(state => state.filesData)
  const [files, setFiles] = useState([]);
  
  //Methods:
  const changeHandler = (e) => {
    setFiles([
      ...files,
      ...Array.from(e.target.files)
    ]);
  };

  const submitHandler = async () => {
    await uploadFiles(filesData,files);
    dispatch(updateFilesData())
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
        <Button variant="contained" onClick={submitHandler}>
          Upload Files
        </Button>
        <Button variant="contained">
          test
        </Button>
        <Button type="file" variant="contained">
          Select Files
        </Button>
        </FilesSelectionContainer>
      </ActionsWrapper>
      {/* <hr width="100vw" /> */}
        <FilesArea filesData={filesData} back={()=>{console.log("in root")} } path=""/>
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

const Button = styled.button`
  font-size: 1em;
  margin: 0.25em;
  padding: 0.25em 0.5em;
  border: 2px solid #5499C7;
  width : 20%;
  height : 20%;
  border-radius: 3px;
  background: white;
  color: #5499C7;
  &:hover {
    background: #5499C7;
    color: white;
  }
`


const FilesContainer = styled.div`
  border: 1px solid black;
  height: 60%;
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;
`;
