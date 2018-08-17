import React from 'react';
import PropTypes from 'prop-types';

function PropertyName({ name }) {
  return name ? <span className="uast-property-name">{name}</span> : null;
}

PropertyName.propTypes = {
  name: PropTypes.string
};

export default PropertyName;
