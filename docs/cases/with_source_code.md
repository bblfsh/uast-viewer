_Node: [codemirror](https://codemirror.net/) and [react-codemirror2](https://github.com/scniro/react-codemirror2) libraries must be installed in your application_

The library provides Source Code Editor and High Ordered Component to connect it to FlatUAST Viewer.

Features:

- Highlight related code on node hover
- Highlight related node on change of cursor
- Scroll code to highlighted position on click on node

```js

import { FlatUASTViewer, Editor, withUASTEditor } from 'uast-viewer';

// define layout for source code editor and UAST Viewer
function Layout({ editorProps, uastViewerProps }) {
  return (
    <div style={{display: 'flex', height: '300px', overflow: 'hidden'}}>
      <Editor {...editorProps} style={{ width: '50%', height: '100%' }}/>
      <FlatUASTViewer {...uastViewerProps} />
    </div>
  );
}

// Use High Ordered Component to get editorProps, uastViewerProps
const LayoutWithComponents = withUASTEditor(Layout);

// Render both components
<LayoutWithComponents
    code={sourceCode}
    languageMode="text/x-java"
    uast={uast}
/>
```
