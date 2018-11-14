import React from 'react';
import renderer from 'react-test-renderer';
import FlatUASTViewer from './components/FlatUASTViewer';
import Editor from './components/Editor';
import withUASTEditor from './withUASTEditor';
import { hocOptions as v1hocOptions, nodeSchema as v1schema } from './uast-v1';
import uastV1 from '../fixtures/uast-v1-java-small.json';
import uastV2 from '../fixtures/uast-v2-java-small.json';

function LayoutV1({ editorProps, uastViewerProps }) {
  return (
    <div>
      <Editor {...editorProps} />
      <FlatUASTViewer {...uastViewerProps} schema={v1schema} />
    </div>
  );
}

function LayoutV2({ editorProps, uastViewerProps }) {
  return (
    <div>
      <Editor {...editorProps} />
      <FlatUASTViewer {...uastViewerProps} />
    </div>
  );
}

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

it('uast-v1', () => {
  const Component = withUASTEditor(LayoutV1, v1hocOptions);

  const tree = renderer
    .create(
      <Component code={sourceCode} languageMode="text/x-java" uast={uastV1} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('uast-v2', () => {
  const Component = withUASTEditor(LayoutV2);

  const tree = renderer
    .create(
      <Component code={sourceCode} languageMode="text/x-java" uast={uastV2} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
