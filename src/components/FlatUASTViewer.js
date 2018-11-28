import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Node, { nodeClassById } from './Node';
import { hoverNodeById } from '../helpers';
import splitProps from '../splitProps';
import TreeContext from './TreeContext';

class FlatUASTViewer extends Component {
  constructor(props) {
    super(props);

    if (process.env.NODE_ENV !== 'production') {
      if (props.initialFlatUast && props.flatUast) {
        // eslint-disable-next-line no-console
        console.warn(
          'FlatUASTViewer: both initialFlatUast and flatUast props are passed ' +
            'initialFlatUast property will be ignored'
        );
      }
    }

    this.state = {
      // keep uast in state only if component is uncontrolled
      flatUast: props.initialFlatUast
    };

    this.onMouseMove = this.onMouseMove.bind(this);
    this.unHoverNode = this.unHoverNode.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.scrollToId = this.scrollToId.bind(this);

    this.lastOverId = null;
    this.el = null;
  }

  componentDidUpdate(prevProps) {
    if (this.props.scrollToNode !== prevProps.scrollToNode) {
      this.scrollToId(this.props.scrollToNode);
    }
  }

  scrollToId(id) {
    if (!id || !this.el) {
      return;
    }

    const nodeEl = this.el.getElementsByClassName(nodeClassById(id))[0];

    if (!nodeEl) {
      return;
    }

    this.el.scrollTop = nodeEl.offsetTop;
  }

  getFlatUast() {
    return this.props.flatUast || this.state.flatUast;
  }

  onMouseMove(id) {
    if (this.lastOverId === id) {
      return;
    }

    if (!this.props.flatUast) {
      const newFlatUast = hoverNodeById(
        this.state.flatUast,
        id,
        this.lastOverId
      );
      this.setState({ flatUast: newFlatUast });
    } else if (this.props.onNodeHover) {
      this.props.onNodeHover(id, this.lastOverId);
    }

    this.lastOverId = id;
  }

  unHoverNode() {
    this.onMouseMove(null);
  }

  onToggle(id) {
    if (!this.props.flatUast) {
      const { flatUast } = this.state;
      const node = flatUast[id];
      const newFlatUast = {
        ...flatUast,
        [id]: {
          ...node,
          expanded: !node.expanded
        }
      };
      this.setState({ flatUast: newFlatUast });
    } else if (this.props.onNodeToggle) {
      this.props.onNodeToggle(id);
    }
  }

  render() {
    const [props, childProps] = splitProps(this.props, FlatUASTViewer);
    const { showLocations, rootIds, schema } = props;
    const flatUast = this.getFlatUast();

    return (
      <div
        className="uast-viewer"
        onMouseLeave={this.unHoverNode}
        ref={r => {
          this.el = r;
        }}
        {...childProps}
      >
        <TreeContext.Provider value={flatUast}>
          {rootIds.map(id => (
            <Node
              key={id}
              id={id}
              schema={schema}
              showLocations={showLocations}
              onToggle={this.onToggle}
              onMouseMove={this.onMouseMove}
              onClick={props.onNodeClick}
            />
          ))}
        </TreeContext.Provider>
      </div>
    );
  }
}

FlatUASTViewer.propTypes = {
  // Object should have {[id]: node} format
  // don't use PropTypes.shape due to possible extra properties in a node
  flatUast: PropTypes.object,
  // same as flatUast but for uncontrolled mode
  initialFlatUast: PropTypes.any,
  rootIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  schema: PropTypes.func,
  showLocations: PropTypes.bool.isRequired,
  scrollToNode: PropTypes.number,
  onNodeHover: PropTypes.func,
  onNodeToggle: PropTypes.func,
  onNodeClick: PropTypes.func
};

FlatUASTViewer.defaultProps = {
  rootIds: [1],
  showLocations: false
};

export default FlatUASTViewer;
