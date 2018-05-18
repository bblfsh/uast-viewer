import React, { Component } from 'react';
import { transformer } from 'uast-viewer';
import Case from './Case';
import uastJson from './uast.json';

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

export default UncontrolledUAST;
