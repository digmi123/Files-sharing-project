import React,{useState} from "react";
import styled from "styled-components";
import { rename } from "../functions/files";
import {useDispatch} from "react-redux"
import {updateFilesData} from "../store/filesDataSlice"

function EditFile ({info , close}){
  const dispatch = useDispatch()
  const [name,setName] = useState()

  const handleSubmit = async (e)=>{
      await rename(info,name);
      dispatch(updateFilesData());
      close();
  }

  return(
  <Container>
      <Text>Rename</Text>
      <input defaultValue={info.name} onChange={(e) => setName(e.target.value)}></input>
      <div>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>        
      </div>
  </Container>
  )
}

const Container = styled.div`
  background-color:#fff;
  border: 2px solid #5499C7;
  border-radius: 5px;
  box-sizing: border-box;
  margin: 1em;
  padding: 1em;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -100px;
  z-index:9;
`;

const Text = styled.p`
    color: #5499C7;
    font-size: larger;
    font-weight: bold;
    font-family: inherit;
`

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 0.5em;
  border: 2px solid #5499C7;
  border-radius: 3px;
  background: white;
  color: #5499C7;
  &:hover {
    background: #5499C7;
    color: white;
  }
`

export default EditFile;