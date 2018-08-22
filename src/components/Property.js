import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import PropertyName from './PropertyName';

function Property({ name, value }) {
  if (typeof value === 'undefined') {
    return null;
  }

  let valueEl;
  if (React.isValidElement(value)) {
    valueEl = value;
  } else {
    let valueStr = value;
    if (value === null) {
      valueStr = 'null';
    } else if (typeof value === 'boolean') {
      valueStr = value ? 'true' : 'false';
    }
    valueEl = <span className={`uast-value ${typeof value}`}>{valueStr}</span>;
  }

  return (
    <Item>
      <div className="uast-title">
        {name ? <PropertyName name={name} /> : null}
        {valueEl}
      </div>
    </Item>
  );
}

Property.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any
};

export default Property;
