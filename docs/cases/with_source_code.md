_Node: [codemirror](https://codemirror.net/) and [react-codemirror2](https://github.com/scniro/react-codemirror2) libraries must be installed in your application_

The library provides Source Code Editor and High Ordered Component to connect it to UAST Viewer.

Features:

- Highlight related code on node hover
- Highlight related node on change of cursor
- Scroll code to highlighted position on click on node

```js
const { Editor, withUASTEditor } = require('uast-viewer');

// define layout for source code editor and UAST Viewer
function Layout({ editorProps, uastViewerProps }) {
  return (
    <div style={{display: 'flex', height: '300px', overflow: 'hidden'}}>
      <Editor {...editorProps} style={{ width: '50%', height: '100%' }}/>
      <UASTViewer {...uastViewerProps} />
    </div>
  );
}

// Use High Ordered Component to get editorProps, uastViewerProps
const LayoutWithComponents = withUASTEditor(Layout);

// Render both components
<LayoutWithComponents
    code={sourceCode.default}
    languageMode="text/x-java"
    uast={uast}
/>
```
