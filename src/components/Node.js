import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import CollapsibleItem from './CollapsibleItem';
import Position from './Position';
import { Property, Properties } from './properties';
import TreeContext from './TreeContext';

export function nodeClassById(id) {
  return `uast-viewer__node-${id}`;
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

  render() {
    const {
      id,
      node,
      schema,
      showLocations,
      onToggle,
      onClick,
      onMouseMove
    } = this.props;

    return (
      <CollapsibleItem
        className={nodeClassById(id)}
        label="Node"
        collapsed={!node.expanded}
        hovered={node.hovered}
        highlighted={node.highlighted}
        toggle={this.handleToggle}
        onMouseMove={this.handleMouseMove}
        onClick={this.handleClick}
      >
        {schema.map(field => {
          const value = field.attr(node);
          if (!field.showEmpty && !value) {
            return null;
          }
          if (field.type === 'object') {
            return (
              <Properties
                key={field.name}
                properties={value}
                name={field.name}
                label={field.label}
              />
            );
          }
          if (field.type === 'array') {
            if (!Array.isArray(value)) {
              return null;
            }
            return (
              <CollapsibleItem
                name={field.name}
                label={field.label}
                key={field.name}
              >
                {value.map((role, i) => <Property key={i} value={role} />)}
              </CollapsibleItem>
            );
          }
          if (field.type === 'location') {
            if (!showLocations) {
              return null;
            }
            return (
              <Position name={field.name} position={value} key={field.name} />
            );
          }
          return <Property name={field.name} value={value} key={field.name} />;
        })}
        <Children
          items={node.Children}
          schema={schema}
          showLocations={showLocations}
          onToggle={onToggle}
          onMouseMove={onMouseMove}
          onClick={onClick}
        />
      </CollapsibleItem>
    );
  }
}

PureNode.propTypes = {
  id: PropTypes.number.isRequired,
  node: PropTypes.object.isRequired,
  schema: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      attr: PropTypes.func.isRequired,
      type: PropTypes.oneOf(['array', 'object', 'location']),
      label: PropTypes.string,
      showEmpty: PropTypes.bool
    })
  ).isRequired,
  showLocations: PropTypes.bool,
  onMouseMove: PropTypes.func,
  onToggle: PropTypes.func,
  onClick: PropTypes.func
};

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

Node.propTypes = Object.keys(PureNode.propTypes).reduce((acc, k) => {
  if (k !== 'node') {
    acc[k] = PureNode.propTypes[k];
  }
  return acc;
}, {});

Node.defaultProps = {
  schema: [
    { name: 'internal_type', attr: n => n.InternalType },
    { name: 'properties', type: 'object', attr: n => n.Properties },
    { name: 'token', attr: n => n.Token },
    { name: 'start_position', type: 'location', attr: n => n.StartPosition },
    { name: 'end_position', type: 'location', attr: n => n.EndPosition },
    { name: 'roles', type: 'array', label: '[]Role', attr: n => n.Roles }
  ],
  showLocations: false
};

export default Node;

class Children extends PureComponent {
  render() {
    const {
      items,
      schema,
      showLocations,
      onMouseMove,
      onToggle,
      onClick
    } = this.props;

    if (!Array.isArray(items)) {
      return null;
    }

    return (
      <CollapsibleItem name="children" label="[]Node">
        {items.map((id, i) => (
          <Node
            key={i}
            id={id}
            schema={schema}
            showLocations={showLocations}
            onMouseMove={onMouseMove}
            onToggle={onToggle}
            onClick={onClick}
          />
        ))}
      </CollapsibleItem>
    );
  }
}

Children.propTypes = {
  items: PropTypes.arrayOf(PropTypes.number),
  schema: Node.propTypes.schema,
  showLocations: PropTypes.bool,
  onMouseMove: PropTypes.func,
  onToggle: PropTypes.func,
  onClick: PropTypes.func
};
