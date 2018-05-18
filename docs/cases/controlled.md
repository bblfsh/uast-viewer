`UASTViewer` component support controlled mode when the application needs to control uast state.

The application is responsible for setting hovered and expanded properties in such case.

```js
const { transformer, hoverNodeById } = require('uast-viewer');

class ControlledExample extends React.Component {
    constructor() {
        this.state = {
            uast: transformer(uast, 1),
            hoveredId: null,
            highlighted: false
        };

        this.onNodeHover = this.onNodeHover.bind(this);
        this.onNodeToggle = this.onNodeToggle.bind(this);

        this.onExpandAll = this.onExpandAll.bind(this);
        this.onCollapseAll = this.onCollapseAll.bind(this);
        this.onHighlight = this.onHighlight.bind(this);
    }

    onNodeHover(id, prevId) {
        this.setState({
            hoveredId: id,
            uast: hoverNodeById(this.state.uast, id, prevId)
        });
    }

    onNodeToggle(id) {
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

    onHighlight() {
        const { uast, highlighted } = this.state;
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
            <button onClick={this.onExpandAll}>expand all</button>
            <button onClick={this.onCollapseAll}>collapse all</button>
            <button onClick={this.onHighlight}>
                Toggle highlight for all nodes with Identifier role
            </button>

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
