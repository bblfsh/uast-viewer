Renders item which can be collapsed.

Label for the item is required:

```js
<CollapsibleItem label="item label">some content</CollapsibleItem>
```

Also accepts optional name property:

```js
<CollapsibleItem name="item name" label="item label">some content</CollapsibleItem>
```

The component can be controlled from outside

```js
class Controlled extends React.Component {
    constructor() {
        this.state = { collapsed: true };
    }

    render() {
        const { collapsed } = this.state;

        return (
            <div>
                <button onClick={() => this.setState({collapsed: !collapsed})}>toggle</button>
                <CollapsibleItem
                    label="controlled item"
                    collapsed={collapsed}
                >{this.props.children}</CollapsibleItem>
            </div>
        );
    }
}

<Controlled>some content</Controlled>
```
