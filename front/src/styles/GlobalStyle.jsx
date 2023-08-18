import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "./global.css";

const GlobalStyle = createGlobalStyle`
  ${reset};

  * {
    box-sizing: border-box;
  }

  body {
    font-family:  sans-serif;
    color: inherit;
    background-color: var(--bg-color);
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  
  button, input, textarea {
    font-family:  sans-serif;
    padding: 0;
    border: none;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    background-color: inherit;
  }

  button {
    cursor: pointer;
  }

  ol, ul, li {
    list-style: none;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export default GlobalStyle;
