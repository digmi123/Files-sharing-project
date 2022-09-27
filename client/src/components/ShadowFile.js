import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {getIconByType} from "../FilesIcons";
import {IconContext} from "react-icons";

function ShadowFile({moveState}) {

    const [info, setMove] = moveState;
    const [mouseCoordinates, satMouseCoordinates] = useState({x: 0, y: 0})

    useEffect(() => {
        const handleMouseMove = (e) => {
            satMouseCoordinates({x: e.pageX, y: e.pageY})
        }
        const handleMouseUp = (e) => {
            setMove({show: false, source: null})
        }
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [setMove])

    const {source} = info
    const Image = getIconByType(source?.type)

    if (!info.show) return (<></>)
    return (
        <FileInfo location={mouseCoordinates}>
            <IconContext.Provider value={{color: "rgb(0,0,0,.5)", size: '50px'}}>
                <Image alt=""/>
                <FileName>{source?.name}</FileName>
            </IconContext.Provider>
        </FileInfo>
    );
}

export default ShadowFile;

const FileInfo = styled.div.attrs(props => ({
    style: {
        top: props.location.y,
        left: props.location.x
    },
}))`
  width: 100px;
  height: 100px;
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

const FileName = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: rgb(0, 0, 0, .5);
`;


