import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CollapsibleItem from './CollapsibleItem';
import { Property, Properties } from './properties';

class Node extends Component {
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
      uast,
      showLocations,
      onToggle,
      onClick,
      onMouseMove
    } = this.props;
    const node = uast[id];

    if (!node) {
      return null;
    }

    return (
      <CollapsibleItem
        label="Node"
        collapsed={!node.expanded}
        hovered={node.hovered}
        highlighted={node.highlighted}
        toggle={this.handleToggle}
        onMouseMove={this.handleMouseMove}
        onClick={this.handleClick}
      >
        <Property name="internal_type" value={node.InternalType} />
        <Properties properties={node.Properties} />
        <Property name="token" value={node.Token} />
        {showLocations ? (
          <Position name="start_position" position={node.StartPosition} />
        ) : null}
        {showLocations ? (
          <Position name="end_position" position={node.EndPosition} />
        ) : null}
        <Roles roles={node.Roles} />
        <Children
          items={node.Children}
          uast={uast}
          showLocations={showLocations}
          onToggle={onToggle}
          onMouseMove={onMouseMove}
          onClick={onClick}
        />
      </CollapsibleItem>
    );
  }
}

Node.propTypes = {
  id: PropTypes.number.isRequired,
  uast: PropTypes.object.isRequired,
  showLocations: PropTypes.bool,
  onMouseMove: PropTypes.func,
  onToggle: PropTypes.func,
  onClick: PropTypes.func
};

Node.defaultProps = {
  showLocations: false
};

export default Node;

export function Roles({ roles }) {
  if (Array.isArray(roles)) {
    return (
      <CollapsibleItem name="roles" label="[]Role">
        {roles.map((role, i) => <Property key={i} value={role} />)}
      </CollapsibleItem>
    );
  }

  return null;
}

Roles.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string)
};

class Children extends Component {
  render() {
    const {
      items,
      uast,
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
            uast={uast}
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
  uast: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.number),
  showLocations: PropTypes.bool,
  onMouseMove: PropTypes.func,
  onToggle: PropTypes.func,
  onClick: PropTypes.func
};

function coordinates(position) {
  if (!position) {
    return [];
  }

  const values = ['Offset', 'Line', 'Col'];

  return values
    .filter(name => typeof position[name] !== 'undefined')
    .map((name, i) => (
      <Property key={i} name={name.toLowerCase()} value={position[name]} />
    ));
}

function Position({ name, position }) {
  const coords = coordinates(position);
  if (position && coordinates.length > 0) {
    return (
      <CollapsibleItem name={name} label="Position">
        {coords}
      </CollapsibleItem>
    );
  }

  return <Property name={name} value={null} />;
}

Position.propTypes = {
  name: PropTypes.string,
  position: PropTypes.shape({
    Offset: PropTypes.number,
    Line: PropTypes.number,
    Col: PropTypes.number
  })
};
