import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import PropertyName from './PropertyName';
import splitProps from '../splitProps';

class CollapsibleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: this.props.collapsed,
      // component can be controlled or uncontrolled depends on did we pass collapsed state on init or not
      // similar to react input components
      controlled: typeof this.props.collapsed !== 'undefined'
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.controlled && state.collapsed !== props.collapsed) {
      return { collapsed: props.collapsed };
    }

    return null;
  }

  toggle() {
    if (!this.state.controlled) {
      this.setState({ collapsed: !this.state.collapsed });
      return;
    }
    if (this.props.toggle) {
      this.props.toggle();
    }
  }

  render() {
    const [props, childProps] = splitProps(this.props, CollapsibleItem);
    const { name, label, children } = props;

    return (
      <Item {...childProps}>
        <div
          className={`uast-title uast-title-collapsible ${
            this.state.collapsed ? 'collapsed' : ''
          }`}
          onClick={this.toggle.bind(this)}
        >
          <PropertyName name={name} />
          <summary className="uast-label">{label}</summary>
        </div>
        {!this.state.collapsed && (
          <div className="uast-content">{children}</div>
        )}
      </Item>
    );
  }
}

CollapsibleItem.propTypes = {
  collapsed: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  toggle: PropTypes.func
};

export default CollapsibleItem;
