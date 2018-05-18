import React, { Component } from 'react';
import {
  transformer,
  DEFAULT_EXPAND_LEVEL,
  hoverNodeById,
  highlightNodeById,
  PositionIndex,
  makePositionIndexHook,
  getNodePosition
} from 'uast-viewer';
import Case from './Case';
import uastJson from './uast.json';

class PosIndexUAST extends Component {
  constructor(props) {
    super(props);

    this.posIndex = new PositionIndex();

    this.state = {
      uast: transformer(
        uastJson,
        DEFAULT_EXPAND_LEVEL,
        makePositionIndexHook(this.posIndex)
      ),
      showLocations: false,
      // control highlighted node
      line: 1,
      col: 1,
      lastHighlighted: null,
      posNotFound: false,
      // position of hovered node
      from: null,
      to: null
    };

    this.onNodeHover = this.onNodeHover.bind(this);
    this.onNodeToggle = this.onNodeToggle.bind(this);

    this.onHighlightNode = this.onHighlightNode.bind(this);
  }

  onNodeHover(id, prevId) {
    const { uast } = this.state;
    const pos = getNodePosition(uast[id]);

    this.setState({
      uast: hoverNodeById(uast, id, prevId),
      from: pos.from,
      to: pos.to
    });
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

  onHighlightNode() {
    const { uast, line, col, lastHighlighted } = this.state;
    const pos = this.posIndex.get({ Line: +line, Col: +col });
    if (!pos) {
      this.setState({ posNotFound: true });
      return;
    }
    const newUast = highlightNodeById(uast, pos.id, lastHighlighted);
    this.setState({
      uast: newUast,
      lastHighlighted: pos.id,
      posNotFound: false
    });
  }

  render() {
    const { from, to } = this.state;
    const hoveredPos =
      from != null && to != null
        ? `${from.line}:${from.ch}-${to.line}:${to.ch}`
        : null;

    return (
      <Case
        title="Controlled mode with position index"
        description="simple way to integrate tree with any text editor"
        uast={this.state.uast}
        onNodeHover={this.onNodeHover}
        onNodeToggle={this.onNodeToggle}
      >
        <div>Hovered position: {hoveredPos}</div>
        <div>
          Select node by position in source code:<br />
          Line:{' '}
          <input
            type="number"
            value={this.state.line}
            onChange={e => this.setState({ line: e.target.value })}
          />
          <br />
          Col:{' '}
          <input
            type="number"
            value={this.state.col}
            onChange={e => this.setState({ col: e.target.value })}
          />
          <br />
          {this.state.posNotFound && (
            <div>Node for this position not found</div>
          )}
          <input
            type="submit"
            value="highlight"
            onClick={this.onHighlightNode}
          />
        </div>
      </Case>
    );
  }
}

export default PosIndexUAST;
