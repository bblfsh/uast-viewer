Just pass a UAST to the component and it will be rendered.

The original UAST must be converted to a flat structure.
The library provides a default transformer function for this purpose.

```js
const { uastV2 } = require('uast-viewer');

<UASTViewer flatUast={uastV2.transformer(uast)} />
```
