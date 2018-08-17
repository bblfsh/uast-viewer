import React from 'react';
import renderer from 'react-test-renderer';
import UASTViewer from './components/UASTViewer';
import Editor from './components/Editor';
import withUASTEditor from './withUASTEditor';
import { hocOptions as v1hocOptions } from './uast-v1';
import uastV1 from '../fixtures/uast-v1-java-small.json';

// eslint-disable-next-line
function Layout({ editorProps, uastViewerProps }) {
  return (
    <div>
      <Editor {...editorProps} />
      <UASTViewer {...uastViewerProps} />
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
  const Component = withUASTEditor(Layout, v1hocOptions);

  const tree = renderer
    .create(
      <Component code={sourceCode} languageMode="text/x-java" uast={uastV1} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
