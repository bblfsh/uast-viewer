import React from 'react';
import PropTypes from 'prop-types';

function Item({ children, ...rest }) {
  return (
    <div className="uast-item" {...rest}>
      {children}
    </div>
  );
}

Item.propTypes = {
  children: PropTypes.node.isRequired
};

export default Item;
