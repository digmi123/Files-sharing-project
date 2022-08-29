import React from "react";
import styled from "styled-components";
import { createProject } from "../functions/ApiCalls";
// import {useDispatch} from "react-redux"
// import { useNavigate } from "react-router-dom";


function EditProject ({info , EditProjectState}){
//   const dispatch = useDispatch()
  const operation = info ? ((data)=>{console.log("edit")}) : createProject;
  const [show,setShow] = EditProjectState;
  const close = () => {setShow(false)}

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const data = new FormData(e.target)
    operation(data)
    close();
  }
  if(!show) return (<></>);
  return(
  <Container>
      <Text>{info ? 'Edit' : 'New'} Project</Text>
      <form onSubmit={handleSubmit}>
      <input name="name" defaultValue={info?.name}></input>    
        <div>
            <Button onClick={close}>Cancel</Button>
            <Button type="submit">Submit</Button>        
        </div>
      </form>
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

export default EditProject;