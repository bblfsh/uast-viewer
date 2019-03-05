Renders a UAST node recursively.

The component must be wrapped with `TreeContext.Provider` containing flat UAST JSON.

```js
// consider as internal api, isn't exported through default uast-viewer entrypoint
import TreeContext from '../../src/components/TreeContext';

const someUast = {
    1: {
        n: {
            "InternalType": "CompilationUnit",
            "@pos": {
                "StartPosition": { "Offset": 0, "Line": 1, "Col": 1 },
                "EndPosition": { "Offset": 446, "Line": 0, "Col": 0 },
            },
            "Roles": ["File"],
            "Children": [{ id: 2, "_uast_node_type": true }],
        },
        expanded: true
    },
    2: {
        n: {
            "InternalType": "LineComment",
            "Properties": { "internalRole": "comments", "text": " hello.java" },
            "Roles": ["Comment"],
            "Children": []
        }
    }
};

<TreeContext.Provider value={someUast}>
    <Node id={1} />
</TreeContext.Provider>
```

With location:

```js
// consider as internal api, isn't exported through default uast-viewer entrypoint
import TreeContext from '../../src/components/TreeContext';

const someUast = {
    1: {
        n: {
            "InternalType": "LineComment",
            "Properties": { "internalRole": "comments", "text": " hello.java" },
            "@pos": {
                "StartPosition": { "Offset": 0, "Line": 1, "Col": 1 },
                "EndPosition": { "Offset": 446, "Line": 0, "Col": 0 },
            },
            "Roles": ["Comment"],
        },
        expanded: true
    }
};

<TreeContext.Provider value={someUast}>
    <Node id={1} showLocations={true} />
</TreeContext.Provider>
```
