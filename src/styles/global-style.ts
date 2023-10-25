import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  
  
  body {
    margin: 0;
    padding: 0;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
  }
  
  p {
    margin: 0;
    padding: 0;
  }
  
  input,
  textarea,
  select {
    &:focus {
      outline: none;
    }
  }
`;

export default GlobalStyle;
