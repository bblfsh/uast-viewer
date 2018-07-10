import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import CollapsibleItem from './CollapsibleItem';

export function PropertyName({ name }) {
  return name ? <span className="uast-property-name">{name}</span> : null;
}

PropertyName.propTypes = {
  name: PropTypes.string
};

export function Property({ name, value }) {
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

export function Properties({ properties, name, label }) {
  if (!properties || !Object.keys(properties).length) {
    return null;
  }

  return (
    <CollapsibleItem name={name} label={label}>
      {Object.keys(properties).map((prop, i) => (
        <Property key={i} name={prop} value={properties[prop]} />
      ))}
    </CollapsibleItem>
  );
}

Properties.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  properties: PropTypes.object
};

Properties.defaultProps = {
  name: 'properties',
  label: 'map<string, string>'
};
