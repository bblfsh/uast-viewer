The library provides class to find a node by position in source code.

```js static
const posIndex = new PositionIndex();
```

### Methods

#### add(node)

Add node to the index.

#### get({ Line, Col })

Get node by position in source code.

#### clear()

Reset index.

### JSON transformer hook

To build the index during JSON transformation we provide a hook:

```js static
import { PositionIndex, makePositionIndexHook, transformer } from 'uast-viewer';

const posIndex = new PositionIndex();
const hook = makePositionIndexHook(posIndex);
const flattenUAST = transformer(uastJSON, 1, hook);
```
