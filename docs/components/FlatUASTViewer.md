Low-level component. Renders flat UAST.

You might need it if you need control over the tree.
Check [controlled example](#/Use cases?id=controlled) for more information.

If you need only render raw UAST without external control, consider using [UASTViewer](#/UI Components?id=uastviewer) component instead.

```js
const someUast = {
    1: {
        "InternalType": "CompilationUnit",
        "StartPosition": { "Offset": 0, "Line": 1, "Col": 1 },
        "EndPosition": { "Offset": 446, "Line": 0, "Col": 0 },
        "Roles": ["File"],
        "Children": [2],
        expanded: true
    },
    2: {
        "InternalType": "LineComment",
        "Properties": { "internalRole": "comments", "text": " hello.java" },
        "StartPosition": { "Offset": 0, "Line": 1, "Col": 1 },
        "EndPosition": { "Offset": 13, "Line": 1, "Col": 14 },
        "Roles": ["Comment"],
        "Children": []
    }
};

<FlatUASTViewer flatUast={someUast} />
```
