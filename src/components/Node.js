import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import CollapsibleItem from './CollapsibleItem';
import Property from './Property';
import Properties from './Properties';
import TreeContext from './TreeContext';
import { nodeSchema as uast1schema } from '../uast-v1';

export function nodeClassById(id) {
  return `uast-viewer__node-${id}`;
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}

class PureNode extends PureComponent {
  constructor(props) {
    super(props);

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleMouseMove(e) {
    // need to stop propagation to catch hover only on the node itself not parent
    e.stopPropagation();

    const { id, onMouseMove } = this.props;
    if (onMouseMove) {
      onMouseMove(id);
    }
  }

  handleToggle() {
    const { id, onToggle } = this.props;
    if (onToggle) {
      onToggle(id);
    }
  }

  handleClick(e) {
    // prevent propagation to parent nodes
    e.stopPropagation();

    const { id, onClick } = this.props;
    if (onClick) {
      onClick(id);
    }
  }

  renderField(field, key) {
    const {
      schema,
      showLocations,
      onToggle,
      onClick,
      onMouseMove
    } = this.props;

    const value = field.attr();

    if (!field.showEmpty && !value) {
      return null;
    }

    switch (field.type) {
      case 'node':
        return (
          <Node
            key={key}
            id={value}
            label={field.label}
            schema={schema}
            showLocations={showLocations}
            onMouseMove={onMouseMove}
            onToggle={onToggle}
            onClick={onClick}
          />
        );
      case 'array':
        if (!Array.isArray(value)) {
          return null;
        }
        return (
          <CollapsibleItem
            name={field.name}
            label={field.label}
            key={field.name}
          >
            {value.map(
              (v, i) =>
                isObject(v) ? (
                  this.renderField(v, i)
                ) : (
                  <Property key={i} value={v} />
                )
            )}
          </CollapsibleItem>
        );
      case 'object':
        return (
          <Properties
            key={key}
            properties={Object.keys(value).reduce((acc, k) => {
              const v = value[k];
              acc[k] = isObject(v) ? this.renderField(v, k) : v;
              return acc;
            }, {})}
            name={field.name}
            label={field.label}
          />
        );
      case 'location':
        if (!showLocations) {
          return null;
        }
        return (
          <Properties
            key={key}
            properties={Object.keys(value).reduce((acc, k) => {
              const v = value[k];
              acc[k] = isObject(v) ? this.renderField(v, k) : v;
              return acc;
            }, {})}
            name={field.name}
            label={field.label}
          />
        );
      default:
        return <Property key={key} name={field.name} value={value} />;
    }
  }

  render() {
    const { id, node, label, schema } = this.props;

    return (
      <CollapsibleItem
        className={nodeClassById(id)}
        label={label}
        collapsed={!node.expanded}
        hovered={node.hovered}
        highlighted={node.highlighted}
        toggle={this.handleToggle}
        onMouseMove={this.handleMouseMove}
        onClick={this.handleClick}
      >
        {schema(node).map(field => this.renderField(field, field.name))}
      </CollapsibleItem>
    );
  }
}

class Node extends Component {
  renderPureNode(uast) {
    const node = uast[this.props.id];

    if (!node) {
      return null;
    }
    return <PureNode {...this.props} node={node} />;
  }

  render() {
    return (
      <TreeContext.Consumer>
        {uast => this.renderPureNode(uast)}
      </TreeContext.Consumer>
    );
  }
}

Node.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  /*
  return value of the schema function must be in the shape:

  PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      attr: PropTypes.func.isRequired,
      type: PropTypes.oneOf(['array', 'object', 'location', 'node']),
      label: PropTypes.string,
      showEmpty: PropTypes.bool
    })
  )
  */
  schema: PropTypes.func.isRequired,
  showLocations: PropTypes.bool,
  onMouseMove: PropTypes.func,
  onToggle: PropTypes.func,
  onClick: PropTypes.func
};

PureNode.propTypes = {
  ...Node.propTypes,
  node: PropTypes.object.isRequired
};

Node.defaultProps = {
  label: 'Node',
  schema: uast1schema,
  showLocations: false
};

export default Node;
