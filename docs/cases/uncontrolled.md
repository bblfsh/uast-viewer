Just pass UAST to the component and it will be rendered.

Original UAST must be converted to flat structure.
The library provides default transformer function for it.

```js
const { transformer } = require('uast-viewer');
<UASTViewer uast={transformer(uast)} />
```
