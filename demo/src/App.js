import React, { Component } from 'react';
import 'uast-viewer/dist/default-theme.css';
import './App.css';
import UncontrolledUAST from './UncontrolledUAST';
import ControlledUAST from './ControlledUAST';
import PosIndexUAST from './PosIndexUAST';

class App extends Component {
  render() {
    return (
      <div className="app">
        <UncontrolledUAST />
        <ControlledUAST />
        <PosIndexUAST />
      </div>
    );
  }
}

export default App;
