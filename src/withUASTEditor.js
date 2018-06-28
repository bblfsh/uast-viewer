import React, { Component } from 'react';
import PropTypes from 'prop-types';
import transformer, { DEFAULT_EXPAND_LEVEL } from './transformer';
import PositionIndex from './PositionIndex';
import {
  hoverNodeById,
  highlightNodeById,
  expandToNodeId,
  makePositionIndexHook,
  getNodePosition
} from './helpers';

function withUASTEditor(WrappedComponent) {
  class UASTEditorWrapper extends Component {
    constructor(props) {
      super(props);

      this.state = this.stateFromUast(props.uast);

      this.onNodeHover = this.onNodeHover.bind(this);
      this.onNodeToggle = this.onNodeToggle.bind(this);
      this.onNodeClick = this.onNodeClick.bind(this);
      this.onCursorChanged = this.onCursorChanged.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.uast !== this.props.uast) {
        this.setState(this.stateFromUast(nextProps.uast));
      }
    }

    stateFromUast(json) {
      this.posIndex = new PositionIndex();

      return {
        uast: transformer(
          json,
          DEFAULT_EXPAND_LEVEL,
          makePositionIndexHook(this.posIndex)
        ),
        // control highlighted node
        lastHighlighted: null,
        // position (line, ch) of nodes
        hoverPos: null,
        clickPos: null
      };
    }

    onNodeHover(id, prevId) {
      const { uast } = this.state;
      const node = uast[id];
      const newUast = hoverNodeById(uast, id, prevId);

      if (!node) {
        this.setState({
          uast: newUast,
          hoverPos: null
        });
        return;
      }

      const hoverPos = getNodePosition(node);

      this.setState({ uast: newUast, hoverPos });
    }

    onNodeToggle(id) {
      const { uast } = this.state;
      const newUast = {
        ...uast,
        [id]: {
          ...uast[id],
          expanded: !uast[id].expanded
        }
      };
      this.setState({ uast: newUast });
    }

    onNodeClick(id) {
      const { uast } = this.state;
      const node = uast[id];

      if (!node) {
        this.setState({ clickPos: null });
        return;
      }

      const clickPos = getNodePosition(node);
      this.setState({ clickPos });
    }

    onCursorChanged(cursorPos) {
      const pos = this.posIndex.get({
        Line: cursorPos.line + 1,
        Col: cursorPos.ch + 1
      });
      if (!pos) {
        return;
      }
      const { uast, lastHighlighted } = this.state;
      const newUast = highlightNodeById(uast, pos.id, lastHighlighted);
      this.setState({
        uast: expandToNodeId(newUast, pos.id),
        lastHighlighted: pos.id
      });
    }

    render() {
      const { code, languageMode, ...rest } = this.props;

      return (
        <WrappedComponent
          editorProps={{
            code,
            languageMode,
            markRange: this.state.hoverPos,
            scrollToPos: this.state.clickPos,
            onCursorChanged: this.onCursorChanged
          }}
          uastViewerProps={{
            uast: this.state.uast,
            onNodeHover: this.onNodeHover,
            onNodeToggle: this.onNodeToggle,
            onNodeClick: this.onNodeClick
          }}
          {...rest}
        />
      );
    }
  }

  UASTEditorWrapper.propTypes = {
    code: PropTypes.string,
    languageMode: PropTypes.string,
    uast: PropTypes.object
  };

  return UASTEditorWrapper;
}

export default withUASTEditor;
