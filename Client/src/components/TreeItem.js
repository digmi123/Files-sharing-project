import React, { useState } from "react";
import { BiRightArrow } from "react-icons/bi";
import styled from "styled-components";
import { getIconByType } from "../FilesData";
import FileTree from "./FileTree";

function TreeItem({ info }) {
  //States:
  const [isOpen, setIsOpen] = useState(false);

  //Methods:
  const HandleArrowToggle = () => {
    setIsOpen(!isOpen);
  };

  //Styling:
  const Icon = styled(getIconByType(info.type))`
  `;

  const Arrow = styled(BiRightArrow)`
    transform: ${(props) => (props.toggle ? "rotate(90deg)" : "rotate(0deg)")};
  `;

  return (
    <Container>
      {info.contains.length !== 0 ? (
        <Arrow
          style={{ marginRight: "8px" }}
          onClick={HandleArrowToggle}
          toggle={isOpen}
        />
      ) : (
        <Icon style={{ marginRight: "8px" }} />
      )}
      {info.fileName}
      {isOpen && <FileTree contains={info.contains} />}
    </Container>
  );
}

export default TreeItem;

const Container = styled.li`
`;

