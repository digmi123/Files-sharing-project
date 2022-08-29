import React, { useState , useEffect} from "react";
import styled from "styled-components";
import {MdEdit} from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { getProjectsList } from "../functions/ApiCalls"
import EditeProject from "./EditProject"


function ProjectsList() {
    const navigate = useNavigate()
    const [list,setList] = useState([])
    const EditProjectState = useState(false)
    const [projectInfo,setProjectInfo] = useState(false);
    const showEditeProject = (item) =>{
        setProjectInfo(item)
        EditProjectState[1](true)
    }

    useEffect(()=>{
        getProjectsList(setList)
    },[])

    const selectProject = (id) => {
        localStorage.setItem("projectID",id)
        navigate("/");
    }

    const newProject = () =>{
        setProjectInfo(null)
        EditProjectState[1](true)
    }

    return (
        <>
        <Container>
            <h2>ProjectsList</h2>
            <ButtonsWrapper>
                {list.map(item => (
                    <div key={item.project_id}>
                        <Button 
                            onClick={() => selectProject(item.project_id)}
                            >{item.name}
                        </Button>
                        <EditButton onClick={()=>showEditeProject(item)}>
                            <MdEdit/>
                        </EditButton>
                    </div>
                ))}
            </ButtonsWrapper>
            <Button onClick={newProject}>New +</Button>
        </Container>
        <EditeProject info={projectInfo} EditProjectState={EditProjectState} />
        </>
    );
}

export default ProjectsList;

const Container = styled.div`
  margin: 0 auto;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

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
}`

const EditButton = styled.button`
font-size: 1em;
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