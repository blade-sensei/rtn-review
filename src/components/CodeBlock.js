import React from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import theme from "react-syntax-highlighter/dist/esm/styles/prism/atom-dark";

const CodeBlock = ({value}) => {

  return (
    <SyntaxHighlighter language='javascript' style={ theme }>
      { value }
    </SyntaxHighlighter>
  );
}

export default CodeBlock;