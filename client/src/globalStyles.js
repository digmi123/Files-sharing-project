import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => (props.whiteColor ? "white" : "#EDEDED")};
    text-align: center;
    font-family: "Assistant";
    padding: 0;
    margin: 0;
  }
`;
