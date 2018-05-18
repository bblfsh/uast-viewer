import React, { Component } from 'react';
import { transformer, hoverNodeById } from 'uast-viewer';
import Case from './Case';
import uastJson from './uast.json';

class ControlledUAST extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLocations: false,
      toggleOnlyEven: false,
      uast: transformer(uastJson),
      hoveredId: null,
      highlighted: false
    };

    this.onNodeHover = this.onNodeHover.bind(this);
    this.onNodeToggle = this.onNodeToggle.bind(this);

    this.onToggleOnlyEven = this.onToggleOnlyEven.bind(this);
    this.onExpandAll = this.onExpandAll.bind(this);
    this.onCollapseAll = this.onCollapseAll.bind(this);
    this.onHighlight = this.onHighlight.bind(this);
  }

  onNodeHover(id, prevId) {
    this.setState({
      hoveredId: id,
      uast: hoverNodeById(this.state.uast, id, prevId)
    });
  }

  onNodeToggle(id) {
    if (this.state.toggleOnlyEven && id % 2 === 0) {
      return;
    }

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

  onToggleOnlyEven() {
    this.setState({ toggleOnlyEven: !this.state.toggleOnlyEven });
  }

  onExpandAll() {
    const newUast = Object.keys(this.state.uast).reduce((acc, key) => {
      acc[key] = {
        ...this.state.uast[key],
        expanded: true
      };
      return acc;
    }, {});

    this.setState({ uast: newUast });
  }

  onCollapseAll() {
    const newUast = Object.keys(this.state.uast).reduce((acc, key) => {
      acc[key] = {
        ...this.state.uast[key],
        expanded: false
      };
      return acc;
    }, {});

    this.setState({ uast: newUast });
  }

  onHighlight() {
    const { uast, highlighted } = this.state;
    const newUast = Object.keys(this.state.uast).reduce((acc, key) => {
      const node = uast[key];
      const newNode = node.Roles.includes('Identifier')
        ? {
            ...node,
            highlighted: !highlighted
          }
        : node;

      acc[key] = newNode;
      return acc;
    }, {});

    this.setState({ uast: newUast, highlighted: !highlighted });
  }

  render() {
    const { hoveredId, uast } = this.state;
    const hoverString = hoveredId
      ? `${uast[hoveredId].InternalType} (${hoveredId})`
      : '';

    return (
      <Case
        title="Controlled mode"
        description={
          'allows to hook to events and process them on an application level.' +
          'The application is responsible for setting hovered and expanded properties in such case.'
        }
        uast={this.state.uast}
        onNodeHover={this.onNodeHover}
        onNodeToggle={this.onNodeToggle}
      >
        <div>
          <label>
            <input
              type="checkbox"
              checked={this.state.toggleOnlyEven}
              onChange={this.onToggleOnlyEven}
            />{' '}
            Toggle only even nodes
          </label>
        </div>
        <div>Hovered node: {hoverString}</div>
        <div>
          <button onClick={this.onExpandAll}>expand all</button>
        </div>
        <div>
          <button onClick={this.onCollapseAll}>collapse all</button>
        </div>
        <div>
          <button onClick={this.onHighlight}>
            Toggle highlight for all nodes with Identifier role
          </button>
        </div>
      </Case>
    );
  }
}

export default ControlledUAST;
