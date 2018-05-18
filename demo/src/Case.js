import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UASTViewer from 'uast-viewer';

class Case extends Component {
  constructor(props) {
    super(props);

    this.state = { showLocations: false };
    this.onShowLocation = this.onShowLocation.bind(this);
  }

  onShowLocation() {
    this.setState({ showLocations: !this.state.showLocations });
  }

  render() {
    const {
      title,
      description,
      children,
      uast,
      onNodeHover,
      onNodeToggle
    } = this.props;
    return (
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="case-content">
          <div className="sidebar">
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={this.state.showLocations}
                  onChange={this.onShowLocation}
                />{' '}
                Show locations
              </label>
              {children}
            </div>
          </div>
          <div className="viewer">
            <UASTViewer
              uast={uast}
              showLocations={this.state.showLocations}
              onNodeHover={onNodeHover}
              onNodeToggle={onNodeToggle}
            />
          </div>
        </div>
      </div>
    );
  }
}

Case.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  uast: PropTypes.object,
  onNodeHover: PropTypes.func,
  onNodeToggle: PropTypes.func
};

export default Case;
