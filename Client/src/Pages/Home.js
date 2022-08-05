import React,{useState,useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import FilesSection from '../components/FilesSection'
import styled from "styled-components";
import  Axios  from 'axios';
import API from "../ApiEndPonts"
import { useNavigate } from "react-router-dom";
import {useSelector , useDispatch} from "react-redux"
import {updateFilesData} from "../store/filesDataSlice"

function Home() {
  const navigate = useNavigate();
  const headers = { "x-access-token": localStorage.getItem("token")};
  const [filesData,setFilesData] = useState({})
  // let {filesData} = useSelector(state => state.filesData)
  // const dispatch = useDispatch()

  const getFilesData = ()=>{
    Axios.get(API.folders.getTree,{headers})
    .then((response)=>{
      setFilesData(response.data)
    })
    .catch((error)=>{
      console.log(error.response.status);
      if(error.response.status === 401) navigate("/login") 
    })
  }
  
  useEffect(()=>{
    getFilesData()
    // dispatch(updateFilesData())
  },[])


  return (
    <HomeContainer>
      {/* files section*/}
      <FilesSection filesData={filesData} updateFilesData={getFilesData}/>
      <hr width="1" size="800" />
      {/* folders bar on left */}
      <Sidebar filesData={filesData}/>
    </HomeContainer>
  );
}

export default Home

const HomeContainer = styled.div`
  display: flex;
  width: 100%;
`;