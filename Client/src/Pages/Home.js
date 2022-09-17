import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import FilesSection from "../components/FilesSection";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateFilesData } from "../API/ApiCalls";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(updateFilesData(navigate));
  }, [dispatch, navigate]);

  return (
    <HomeContainer>
      {/* folders bar on left */}
      <Sidebar />
      <Partition width="1" />
      {/* files section*/}
      <FilesSection />
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(180deg, #e8e8e8, rgb(204, 235, 255));
`;

const Partition = styled.hr``;
