_Node: [codemirror](https://codemirror.net/) and [react-codemirror2](https://github.com/scniro/react-codemirror2) libraries must be installed in your application_

The library provides Source Code Editor and High Ordered Component to connect it to UAST Viewer.

Features:

- Highlight related code on node hover
- Highlight related node on change of cursor
- Scroll code to highlighted position on click on node

```js
const { Editor, withUASTEditor } = require('uast-viewer');

// source code as string for example UAST
const sourceCode = `// hello.java
import java.io.*;
import javax.servlet.*;

public class Hello extends GenericServlet {
    public void service(final ServletRequest request, final ServletResponse response)
    throws ServletException, IOException {
        response.setContentType("text/html");
        final PrintWriter pw = response.getWriter();
        try {
            pw.println("Hello, world!");
        } finally {
            pw.close();
        }
    }
}`;

// define layout for source code editor and UAST Viewer
function Layout({ editorProps, uastViewerProps }) {
  return (
    <div style={{display: 'flex', height: '300px'}}>
      <div style={{ width: '50%' }}>
        <Editor {...editorProps} />
      </div>
      <div className="viewer" style={{ width: '50%', overflow: 'auto' }}>
        <UASTViewer {...uastViewerProps} />
      </div>
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
