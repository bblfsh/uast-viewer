The library provides built-in function to transform UAST JSON to flat structure:

```js static
import { uastV1 } from 'uast-viewer';

const flattenUAST = uastV1.transformer(uastJSON);
```

and operate on it:

### getNodePosition

Returns position of the node in the source code started with *zero* (opposite to bblfsh which starts counting from 1).

```js static
import { uastV1 } from 'uast-viewer';

const pos = uastV1.getNodePosition(nodeWithCorrectPosition);
// pos = { from: { line: N, ch: N }, to: { line: N, ch: N }}

const pos = uastV1.getNodePosition(nodeWithoutPosition);
// pos = { from: null, to: null }

const pos = uastV1.getNodePosition(nodeWithStartPosition);
// pos = { from: { line: N, ch: N }, to: null}
```

### getChildrenIds

Returns array of all children ids for a node

```js static
import { uastV1 } from 'uast-viewer';

const ids = uastV1.getChildrenIds(node); // [2, 3, 4]
```
