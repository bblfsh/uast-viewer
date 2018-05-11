import React from 'react';
import PropTypes from 'prop-types';

function Item({ children, hovered, highlighted, ...rest }) {
  let className = 'uast-item';
  if (hovered) {
    className += ' hovered';
  }
  if (highlighted) {
    className += ' highlighted';
  }

  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}

Item.propTypes = {
  children: PropTypes.node.isRequired,
  hovered: PropTypes.bool,
  highlighted: PropTypes.bool
};

Item.defaultProps = {
  hovered: false,
  highlighted: false
};

export default Item;
