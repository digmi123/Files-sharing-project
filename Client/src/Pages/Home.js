import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import FilesSection from "../components/FilesSection";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateFilesData } from "../functions/ApiCalls";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(updateFilesData(navigate));
  }, [dispatch, navigate]);

  return (
    <>
      <NavBar />
      <HomeContainer>
        {/* files section*/}
        <FilesSection />
        <hr width="1" size="800" />
        {/* folders bar on left */}
        <Sidebar />
      </HomeContainer>
    </>
  );
}

export default Home;

const HomeContainer = styled.div`
  display: flex;
  width: 100%;
  background-image: linear-gradient(180deg, #e8e8e8, rgb(204, 235, 255));
`;
