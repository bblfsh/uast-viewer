The `UASTViewer` component supports controlled mode when the application needs to control the UAST state.

The application is responsible for setting the `hovered` and `expanded` properties in such case.

```js
const { transformer, hoverNodeById, toggleNodeById } = require('uast-viewer');

class ControlledExample extends React.Component {
    constructor() {
        this.state = {
            // transform uast.json expanding only the first level nodes
            uast: transformer(uast, 1),
            hoveredId: null,
            highlighted: false
        };

        // the component must define onNodeHover and onNodeToggle functions
        this.onNodeHover = this.onNodeHover.bind(this);
        this.onNodeToggle = this.onNodeToggle.bind(this);

        // define some other tree manipulators
        this.onExpandAll = this.onExpandAll.bind(this);
        this.onCollapseAll = this.onCollapseAll.bind(this);
        this.onHighlight = this.onHighlight.bind(this);
    }

    // the component would call this methods when user hovers a new node
    onNodeHover(id, prevId) {
        this.setState({
            // an application has access to hovered id
            hoveredId: id,
            // modify tree using provided helper
            uast: hoverNodeById(this.state.uast, id, prevId)
        });
    }

    // the component would call this methods when user tries to expand or collapse a node
    onNodeToggle(id) {
        // an application can disallow toggling or run custom code on event
        this.setState({
            // modify tree using provided helper
            uast: toggleNodeById(this.state.uast, id)
        });
    }

    // example of an application-level tree transformer
    // expands all the tree keeping other properties of nodes unchanged (for example highlighting)
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

    // another example of an application-level tree transformer
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

    // an application can set highlighted property to a node it would affect how the node is displayed
    onHighlight() {
        const { uast, highlighted } = this.state;
        // modify the tree and toggle highlighted prop to every node with an Identifier role
        const newUast = Object.keys(this.state.uast).reduce((acc, key) => {
            const node = uast[key];
            const newNode = node.Roles.includes('Identifier')
                ? {
                    ...node,
                    highlighted: !highlighted
                } : node;

            acc[key] = newNode;
            return acc;
        }, {});

        this.setState({ uast: newUast, highlighted: !highlighted });
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.onExpandAll}>expand all</button>
                    <button onClick={this.onCollapseAll}>collapse all</button>
                    <button onClick={this.onHighlight}>
                        Toggle highlight for all nodes with Identifier role
                    </button>
                </div>
                <div>
                    Last hovered node id: {this.state.hoveredId}
                </div>

                {/* the component becomes controlled
                    when onNodeHover or onNodeToggle props are passed */}
                <UASTViewer
                    uast={this.state.uast}
                    onNodeHover={this.onNodeHover}
                    onNodeToggle={this.onNodeToggle}
                />
            </div>
        )
    }
}

<ControlledExample />
```
