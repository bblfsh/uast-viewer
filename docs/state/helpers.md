The library provides the most common function to operate on state.

### hoverNodeById

Sets property `hovered: true` to selected node and `hovered: false` to previously hovered node.

```js static
import { hoverNodeById } from 'uast-viewer';

const newUast = hoverNodeById(uast, id, prevId);
```

### toggleNodeById

Sets property `expanded: !expanded` to selected node.

```js static
import { toggleNodeById } from 'uast-viewer';

const newUast = toggleNodeById(uast, id);
```

### highlightNodeById

Sets property `highlighted: true` to selected node and `highlighted: false` to previously highlighted node.

```js static
import { highlightNodeById } from 'uast-viewer';

const newUast = highlightNodeById(uast, id, prevId);
```

### getNodePosition

Returns position of the node in the source code started with *zero* (opposite to bblfsh which starts counting from 1).

```js static
import { getNodePosition } from 'uast-viewer';

const pos = getNodePosition(nodeWithCorrectPosition);
// pos = { from: { line: N, ch: N }, to: { line: N, ch: N }}

const pos = getNodePosition(nodeWithoutPosition);
// pos = { from: null, to: null }

const pos = getNodePosition(nodeWithStartPosition);
// pos = { from: { line: N, ch: N }, to: null}
```
