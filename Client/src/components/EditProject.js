import React, { useEffect } from "react";
import styled from "styled-components";
import { editProject } from "../API/ApiCalls";
import { MdDelete } from 'react-icons/md';
import ProjectAccess from "./ProjectAccess";


function EditProject({ projectInfoState, EditProjectState }) {
  const [projectInfo, setProjectInfo] = projectInfoState

  useEffect(() => {
    console.log(projectInfo?.id);
  }, [projectInfo])

  const [show, setShow] = EditProjectState;

  const close = e => {
    e.preventDefault();
    setShow(false);
  }

  const handleRename = e => {
    setProjectInfo(pre => ({ ...pre, name: e.target.value }))
  }

  const handleSubmit = async (e) => {
    editProject(projectInfo)
    close(e);
  }
  if (!show) return (<></>);
  return (
    <Container>
      <Text>{projectInfo?.id ? 'Edit' : 'New'} Project</Text>
      <form onSubmit={handleSubmit}>
        <input value={projectInfo.name} onChange={handleRename}></input>
        <ProjectAccess projectInfoState={projectInfoState} name="ProjectAccess" />
        <div>
          <Button onClick={close}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
      <div>
        {projectInfo?.id && (
          <DeleteButton>
            <MdDelete />
          </DeleteButton>)}
      </div>

    </Container>
  )
}

const Container = styled.div`
  background-color:#ffffff;
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

const DeleteButton = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 0.5em;
  border: 2px solid #ff0000;
  border-radius: 3px;
  background: white;
  color: #ff0000;
  &:hover {
    background: #ff0000;
    color: white;
}`

export default EditProject;