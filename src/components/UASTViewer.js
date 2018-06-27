import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Node from './Node';
import { hoverNodeById } from '../helpers';
import splitProps from '../splitProps';

class UASTViewer extends Component {
  constructor(props) {
    super(props);

    this.controlled = Boolean(props.onNodeToggle || props.onNodeHover);

    if (!this.controlled) {
      this.state = { uast: props.uast };
    }

    this.onMouseMove = this.onMouseMove.bind(this);
    this.unHoverNode = this.unHoverNode.bind(this);
    this.onToggle = this.onToggle.bind(this);

    this.lastOverId = null;
  }

  // TODO(max): make sure there are no problems with this.lastOverId
  // easier to cover it by tests than manual testing
  componentWillReceiveProps(nextProps) {
    if (this.controlled) {
      return;
    }

    if (this.props.uast !== nextProps.uast) {
      this.setState({ uast: nextProps.uast });
    }
  }

  getUast() {
    if (this.controlled) {
      return this.props.uast;
    }
    return this.state.uast;
  }

  onMouseMove(id) {
    if (this.lastOverId === id) {
      return;
    }
    if (this.props.onNodeHover) {
      this.props.onNodeHover(id, this.lastOverId);
    }
    if (!this.controlled) {
      const newUast = hoverNodeById(this.state.uast, id, this.lastOverId);
      this.setState({ uast: newUast });
    }

    this.lastOverId = id;
  }

  unHoverNode() {
    this.onMouseMove(null);
  }

  onToggle(id) {
    if (this.props.onNodeToggle) {
      this.props.onNodeToggle(id);
    }
    if (this.controlled) {
      return;
    }

    const uast = this.getUast();
    const node = uast[id];
    const newUast = {
      ...uast,
      [id]: {
        ...node,
        expanded: !node.expanded
      }
    };
    this.setState({ uast: newUast });
  }

  render() {
    const [props, childProps] = splitProps(this.props, UASTViewer);
    const { showLocations, rootIds } = props;
    const uast = this.getUast();

    return (
      <div
        className="uast-viewer"
        onMouseLeave={this.unHoverNode}
        {...childProps}
      >
        {rootIds.map(id => (
          <Node
            key={id}
            id={id}
            uast={uast}
            showLocations={showLocations}
            onToggle={this.onToggle}
            onMouseMove={this.onMouseMove}
          />
        ))}
      </div>
    );
  }
}

UASTViewer.propTypes = {
  // Object should have {[id]: node} format
  // don't use PropTypes.shape due to possible extra properties in a node
  uast: PropTypes.object.isRequired,
  rootIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  showLocations: PropTypes.bool.isRequired,
  onNodeHover: PropTypes.func,
  onNodeToggle: PropTypes.func
};

UASTViewer.defaultProps = {
  rootIds: [1],
  showLocations: false
};

export default UASTViewer;
