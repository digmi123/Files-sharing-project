import React from "react";
import styled from "styled-components";
import {getIconByType} from "../FilesData";

function File({ info }) {
  const Image = styled(getIconByType(info.type))`
    font-size: 60px;
  `;

  console.log(info.type);
  return (
    <FileCard>
      <CheckBox type="checkbox" name={info.fileName} />
      <FileInfo>
        <Image alt="" />
        <FileName>{info.name.replace(/\.[^/.]+$/, "")}</FileName>
      </FileInfo>
    </FileCard>
  );
}

export default File;

const FileCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  position: relative;
`;

const FileName = styled.p`
  margin-top: 5px;
  font-size: 1.2rem;
  font-weight: bold;
`;

const CheckBox = styled.input`
  position: absolute;
  top: -2px;
  right: -4px;
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: flex-end;
  margin-right: 30px;
  margin-left: 30px;
  position: relative;
`;