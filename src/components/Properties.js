import React from 'react';
import PropTypes from 'prop-types';
import CollapsibleItem from './CollapsibleItem';
import Property from './Property';

function Properties({ properties, name, label }) {
  if (!properties || !Object.keys(properties).length) {
    return null;
  }

  return (
    <CollapsibleItem name={name} label={label}>
      {Object.keys(properties).map((prop, i) => {
        const v = properties[prop];
        if (React.isValidElement(v)) {
          return v;
        }
        return <Property key={i} name={prop} value={v} />;
      })}
    </CollapsibleItem>
  );
}

Properties.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  properties: PropTypes.object
};

export default Properties;
