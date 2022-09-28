import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {MdEdit} from 'react-icons/md';
import {useNavigate} from "react-router-dom";
import {getProjectsList, createProject} from "../API/ApiCalls"
import EditeProject from "./EditProject"


function ProjectsList() {
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const EditProjectState = useState(false);
    const setEditProject = EditProjectState[1];
    const projectInfoState = useState(null);
    const setProjectInfo = projectInfoState[1];

    const showEditeProject = item => {
        setProjectInfo(item)
        setEditProject(true)
    }

    const updateProjectsList = () => {
        getProjectsList(setList)
    }

    useEffect(updateProjectsList, [])

    const selectProject = id => {
        localStorage.setItem("projectID", id)
        navigate("/");
    }

    const newProject = e => {
        createProject(updateProjectsList)
    }

    return (
        <>
            <Container>
                <h2>ProjectsList</h2>
                <ButtonsWrapper>
                    {list.map(item => (
                        <div key={item.id}>
                            <Button
                                onClick={() => selectProject(item.project_id)}
                            >{item.name}
                            </Button>
                            <Button onClick={() => showEditeProject(item)}>
                                <MdEdit/>
                            </Button>
                        </div>
                    ))}
                </ButtonsWrapper>
                <Button onClick={newProject}>New +</Button>
            </Container>
            <EditeProject projectInfoState={projectInfoState} EditProjectState={EditProjectState}/>
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
  margin: 1em 0.25em;
  padding: 0.25em 0.5em;
  border: 2px solid #5499C7;
  border-radius: 3px;
  background: white;
  color: #5499C7;

  &:hover {
    background: #5499C7;
    color: white;
  }`