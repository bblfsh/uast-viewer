import React, { Component } from 'react';
import 'uast-viewer/dist/default-theme.css';
import './App.css';
import UncontrolledUAST from './UncontrolledUAST';
import ControlledUAST from './ControlledUAST';

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
      <div className="app">
        <UncontrolledUAST />
        <ControlledUAST />
      </div>
    );
  }
}

export default App;
