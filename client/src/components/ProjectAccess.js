import React, {useEffect, useState} from "react";
import {getPermissionsList} from "../API/ApiCalls"
import styled from "styled-components";
import {MdDelete} from 'react-icons/md';


function ProjectAccess({projectInfoState}) {
    const [projectInfo, setProjectInfo] = projectInfoState
    const [permissionsList, setPermissionsList] = useState([])

    useEffect(() => {
        getPermissionsList(setPermissionsList);
    }, [])

    useEffect(() => {
        console.log(projectInfo);
    }, [projectInfo])

    const onAdd = e => {
        e.preventDefault();
        setProjectInfo(prev => ({
            ...prev,
            accessinfo: [...prev.accessinfo, {email: "example@email.com", roll: "None"}]
        }))
    }

    const removeIndex = (indexToRemove) => e => {
        setProjectInfo(prev => ({
            ...prev,
            accessinfo: prev.accessinfo.filter((item, index) => index !== indexToRemove)
        }))
    }

    const handleChange = (index, key) => e => {
        setProjectInfo(prev => {
            let next = [...prev.accessinfo];
            next[index][key] = e.target.value;
            return {...prev, accessinfo: next}
        })
    }


    return (
        <Container>
            {projectInfo && projectInfo.accessinfo.map(({email, roll}, index) => (
                <div key={index}>
                    <Input value={email} onChange={handleChange(index, "email")}></Input>
                    <select value={roll} onChange={handleChange(index, "roll")}>
                        {permissionsList.map((option) => (
                            <option key={option.name}>{option.name}</option>
                        ))}
                    </select>
                    <button type="button" onClick={removeIndex(index)}>
                        <MdDelete/>
                    </button>
                </div>
            ))}
            <div>
                <button type="button" onClick={onAdd}>add</button>
            </div>
        </Container>
    )
}

const Container = styled.div`
  background-color: #fff;
  border: 2px solid #5499C7;
  border-radius: 5px;
  box-sizing: border-box;
  margin: 1em;
  padding: 1em;
  width: 90%;
`;

const Input = styled.input`
  width: 50%;
`;

export default ProjectAccess;