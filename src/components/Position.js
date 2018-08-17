import React from 'react';
import PropTypes from 'prop-types';
import CollapsibleItem from './CollapsibleItem';
import Property from './Property';

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

export default Position;
