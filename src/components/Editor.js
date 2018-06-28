import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Controlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/php/php';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/go/go';
import 'codemirror/mode/shell/shell';

import splitProps from '../splitProps';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.bookmark = null;

    this.onCursor = this.onCursor.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  get document() {
    return this.editor.getDoc();
  }

  get editor() {
    return this.codemirror.editor;
  }

  selectCode(range) {
    if (this.mark) {
      this.mark.clear();
    }

    if (!range) {
      this.mark = null;
      return;
    }

    const { from, to } = range;

    if (from && to) {
      this.mark = this.document.markText(from, to, {
        className: 'uast-editor-mark'
      });
    } else if (from && this.bookmark) {
      this.mark = this.document.setBookmark(from, {
        widget: this.bookmark
      });
    }
  }

  scrollToPos(pos) {
    // don't change scroll without position
    if (!pos) {
      return;
    }

    // try to position line in the center of viewport
    const { clientHeight } = this.editor.getScrollInfo();
    this.editor.scrollIntoView(pos, clientHeight / 2);
  }

  componentDidMount() {
    this.bookmark.remove();

    this.selectCode(this.props.markRange);
    this.scrollToPos(this.props.scrollToPos);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.markRange !== this.props.markRange) {
      this.bookmark.remove();
      this.selectCode(this.props.markRange);
    }
    if (prevProps.scrollToPos !== this.props.scrollToPos) {
      this.scrollToPos(this.props.scrollToPos);
    }
  }

  onCursor(_, pos) {
    if (!this.props.onCursorChanged) {
      return;
    }

    this.props.onCursorChanged(pos);
  }

  onChange(editor, data, value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    const [props, childProps] = splitProps(this.props, Editor);
    const { code, languageMode, theme } = props;

    const options = {
      mode: languageMode,
      lineNumbers: true,
      theme
    };

    return (
      <div className="uast-editor" {...childProps}>
        <CodeMirror
          ref={r => {
            this.codemirror = r;
          }}
          value={code || ''}
          options={options}
          onBeforeChange={this.onChange}
          onCursor={this.onCursor}
        />
        <div
          className="uast-editor-bookmark"
          ref={r => {
            this.bookmark = r;
          }}
        />
      </div>
    );
  }
}

Editor.propTypes = {
  code: PropTypes.string,
  languageMode: PropTypes.string,
  markRange: PropTypes.shape({
    from: PropTypes.shape({
      line: PropTypes.number,
      ch: PropTypes.number
    }),
    to: PropTypes.shape({
      line: PropTypes.number,
      ch: PropTypes.number
    })
  }),
  scrollToPos: PropTypes.shape({
    line: PropTypes.number,
    ch: PropTypes.number
  }),
  theme: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onCursorChanged: PropTypes.func
};

Editor.defaultProps = {
  theme: 'solarized light'
};

export default Editor;
