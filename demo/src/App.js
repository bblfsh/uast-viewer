import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UASTViewer, { transformer, hoverNodeById } from 'uast-viewer';
import 'uast-viewer/dist/default-theme.css';
import './App.css';
import uastJson from './uast.json';

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

class UncontrolledUAST extends Component {
  constructor(props) {
    super(props);

    this.state = { uast: transformer(uastJson) };
    this.onDefault = this.onDefault.bind(this);
    this.onCollapsed = this.onCollapsed.bind(this);
    this.onExpanded = this.onExpanded.bind(this);
  }

  onDefault() {
    this.setState({ uast: transformer(uastJson) });
  }

  onCollapsed() {
    this.setState({ uast: transformer(uastJson, 0) });
  }

  onExpanded() {
    this.setState({ uast: transformer(uastJson, Infinity) });
  }

  render() {
    return (
      <Case
        title="Uncontrolled mode"
        description="just pass converted UAST to the component and it will be rendered"
        uast={this.state.uast}
      >
        <div>
          <button onClick={this.onDefault}>Default UAST</button>
        </div>
        <div>
          <button onClick={this.onCollapsed}>Collapsed UAST</button>
        </div>
        <div>
          <button onClick={this.onExpanded}>Expanded UAST</button>
        </div>
      </Case>
    );
  }
}

class ControlledUAST extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLocations: false,
      toggleOnlyEven: false,
      uast: transformer(uastJson),
      hoveredId: null
    };

    this.onNodeHover = this.onNodeHover.bind(this);
    this.onNodeToggle = this.onNodeToggle.bind(this);

    this.onShowLocation = this.onShowLocation.bind(this);
    this.onToggleOnlyEven = this.onToggleOnlyEven.bind(this);
    this.onExpandAll = this.onExpandAll.bind(this);
    this.onCollapseAll = this.onCollapseAll.bind(this);
  }

  onNodeHover(id, prevId) {
    this.setState({
      hoveredId: id,
      uast: hoverNodeById(this.state.uast, id, prevId)
    });
  }

  onNodeToggle(id) {
    if (this.state.toggleOnlyEven && id % 2 === 0) {
      return;
    }

    const { uast } = this.state;
    const newUast = {
      ...uast,
      [id]: {
        ...uast[id],
        expanded: !uast[id].expanded
      }
    };
    this.setState({ uast: newUast });
  }

  onShowLocation() {
    this.setState({ showLocations: !this.state.showLocations });
  }

  onToggleOnlyEven() {
    this.setState({ toggleOnlyEven: !this.state.toggleOnlyEven });
  }

  onExpandAll() {
    const newUast = Object.keys(this.state.uast).reduce((acc, key) => {
      acc[key] = {
        ...this.state.uast[key],
        expanded: true
      };
      return acc;
    }, {});

    this.setState({ uast: newUast });
  }

  onCollapseAll() {
    const newUast = Object.keys(this.state.uast).reduce((acc, key) => {
      acc[key] = {
        ...this.state.uast[key],
        expanded: false
      };
      return acc;
    }, {});

    this.setState({ uast: newUast });
  }

  render() {
    const { hoveredId, uast } = this.state;
    const hoverString = hoveredId
      ? `${uast[hoveredId].InternalType} (${hoveredId})`
      : '';

    return (
      <Case
        title="Controlled mode"
        description={
          'allows to hook to events and process them on an application level.' +
          'The application is responsible for setting hovered and expanded properties in such case.'
        }
        uast={this.state.uast}
        onNodeHover={this.onNodeHover}
        onNodeToggle={this.onNodeToggle}
      >
        <div>
          <label>
            <input
              type="checkbox"
              checked={this.state.toggleOnlyEven}
              onChange={this.onToggleOnlyEven}
            />{' '}
            Toggle only even nodes
          </label>
        </div>
        <div>Hovered node: {hoverString}</div>
        <div>
          <button onClick={this.onExpandAll}>expand all</button>
        </div>
        <div>
          <button onClick={this.onCollapseAll}>collapse all</button>
        </div>
      </Case>
    );
  }
}

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
