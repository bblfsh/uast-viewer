import React from 'react';

import UASTViewer, { Editor, withUASTEditor } from 'uast-viewer';
import 'uast-viewer/dist/default-theme.css';

const Viewer = withUASTEditor(({ editorProps, uastViewerProps }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%', maxHeight: '99vh' }}>
        <Editor {...editorProps} />
      </div>
      <div className="viewer" style={{ width: '50%', overflow: 'auto', maxHeight: '99vh' }}>
        <UASTViewer {...uastViewerProps} />
      </div>
    </div>
  );
});

class App extends React.Component {
  constructor() {
    super();

    this.state = { code: null, lang: null, uast: null };

    this.handleFile = this.handleFile.bind(this);
  }

  handleFile(e) {
    const input = document.querySelector('input');
    const file = input.files[0];

    let reader = new FileReader();
    reader.onload = () => {
      // content of dropped file `{ code: '...', lang: '...', uast: {...} }`
      const inputJSON = JSON.parse(reader.result);
      this.setState(inputJSON);
    };
    reader.readAsText(file);
  }

  render() {
    const { code, lang, uast } = this.state;
    return (
      <div>
        {code ? <Viewer
          code={code}
          languageMode={lang}
          uast={uast}
        /> : <input onChange={this.handleFile} type="file"></input>}
      </div>
    );
  }
}

export default App;
