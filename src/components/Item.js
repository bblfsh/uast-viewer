import React from 'react';
import PropTypes from 'prop-types';

function Item({ children, hovered, highlighted, className, ...rest }) {
  let newClassName = `${className} uast-item`;
  if (hovered) {
    newClassName += ' hovered';
  }
  if (highlighted) {
    newClassName += ' highlighted';
  }

  return (
    <div className={newClassName} {...rest}>
      {children}
    </div>
  );
}

Item.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  hovered: PropTypes.bool,
  highlighted: PropTypes.bool
};

Item.defaultProps = {
  hovered: false,
  highlighted: false
};

export default Item;
