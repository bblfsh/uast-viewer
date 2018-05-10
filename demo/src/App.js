import React, { Component } from 'react';
/* package doesn't exist on npm yet */
/* eslint import/no-extraneous-dependencies: 0 */
import UASTViewer from 'uast-viewer';
import 'uast-viewer/dist/default-theme.css';
import uastJson from './uast.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { showLocations: false };
    this.onShowLocation = this.onShowLocation.bind(this);
  }

  onShowLocation() {
    this.setState({ showLocations: !this.state.showLocations });
  }

  render() {
    return (
      <div
        className="app"
        style={{
          width: '600px',
          margin: '20px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <div style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="checkbox"
              checked={this.state.showLocations}
              onChange={this.onShowLocation}
            />{' '}
            Show locations
          </label>
        </div>
        <UASTViewer uast={uastJson} showLocations={this.state.showLocations} />
      </div>
    );
  }
}

export default App;
