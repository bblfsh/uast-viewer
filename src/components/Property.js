import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import PropertyName from './PropertyName';

function Property({ name, value }) {
  if (typeof value === 'undefined') {
    return null;
  }

  return (
    <Item>
      <div className="uast-title">
        {name ? <PropertyName name={name} /> : null}
        <span className={`uast-value ${typeof value}`}>
          {value !== null ? value : 'null'}
        </span>
      </div>
    </Item>
  );
}

Property.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any
};

export default Property;
