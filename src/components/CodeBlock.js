import React from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({value}) => {

  return (
    <SyntaxHighlighter language='java' style={ theme }>
      { value }
    </SyntaxHighlighter>
  );
}

export default CodeBlock;