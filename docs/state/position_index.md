The library provides class to find a node by position in source code.

```js static
const posIndex = new PositionIndex();
```

### Methods

#### add(node, [startLine, startCol], [endLine, endCol])

Add node to the index.

#### get(targetLine, targetCol)

Get node by position in source code.

#### clear()

Reset index.
