import React,{useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import FilesSection from '../components/FilesSection'
import styled from "styled-components";
import { useDispatch} from "react-redux"
import {updateFilesData} from "../store/filesDataSlice"
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    dispatch(updateFilesData(navigate))
},[dispatch, navigate])




  return (
    <HomeContainer>
      {/* files section*/}
      <FilesSection/>
      <hr width="1" size="800" />
      {/* folders bar on left */}
      <Sidebar/>
    </HomeContainer>
  );
}

export default Home

const HomeContainer = styled.div`
  display: flex;
  width: 100%;
`;