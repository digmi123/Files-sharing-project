import React, { useState } from "react";
import { BiRightArrow } from "react-icons/bi";
import styled from "styled-components";
import { getIconByType } from "../FilesIcons";
import FileTree from "./FileTree";

function TreeItem({ info }) {
  //States:
  const [isOpen, setIsOpen] = useState(false);

  //Methods:
  const HandleArrowToggle = () => {
    setIsOpen(!isOpen);
  };

  // Styling:

  const Icon = getIconByType(info.type)


  return (
    <Container>
      {info.contains?.length  ? (
        <Arrow
          style={{ marginRight: "8px" }}
          onClick={HandleArrowToggle}
          toggle={isOpen.toString()}
        />
      ) : (
        <Icon style={{ marginRight: "8px" }} />
      )}
      {info.name}
      {isOpen && <FileTree contains={info.contains} />}
    </Container>
  );
}


const Arrow = styled(BiRightArrow)`
transition: all 0.3s ease-in-out;
transform: ${(props) => (props.toggle === "true" ? "rotate(90deg)" : "rotate(0deg)")};
`;

const Container = styled.li`
  font-size: 25px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;

export default TreeItem;