import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Node from './Node';

class UASTViewer extends Component {
  render() {
    const { uast, showLocations } = this.props;

    return (
      <div className="uast-viewer">
        <Node node={uast} showLocations={showLocations} />
      </div>
    );
  }
}

UASTViewer.propTypes = {
  uast: PropTypes.object, // valid UAST json
  showLocations: PropTypes.bool
};

export default UASTViewer;
