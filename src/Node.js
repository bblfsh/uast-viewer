import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CollapsibleItem from './CollapsibleItem';
import { Property, Properties } from './properties';

class Node extends Component {
  render() {
    const { node, showLocations, toggle } = this.props;
    const onToggle = toggle ? () => toggle(node.id) : undefined;

    if (!node) {
      return null;
    }

    return (
      <CollapsibleItem label="Node" toggle={onToggle}>
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
        <Children items={node.Children} showLocations={showLocations} />
      </CollapsibleItem>
    );
  }
}

Node.propTypes = {
  node: PropTypes.object, // valid UAST json
  showLocations: PropTypes.bool,
  toggle: PropTypes.func
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
    const { items, showLocations } = this.props;

    if (!Array.isArray(items)) {
      return null;
    }

    return (
      <CollapsibleItem name="children" label="[]Node">
        {items.map((node, i) => (
          <Node key={i} node={node} showLocations={showLocations} />
        ))}
      </CollapsibleItem>
    );
  }
}

Children.propTypes = {
  showLocations: PropTypes.bool,
  items: PropTypes.array
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
