The library provides built-in function to transform UAST JSON to flat structure:

```js static
import { transformer } from 'uast-viewer';

const flattenUAST = transformer(uastJSON);
```

By default it would expand first 2 level of nodes (set `expanded: true`) to them.

Second parameter for the function allows to change it:

```js static
// expand only the first level
const flattenUAST = transformer(uastJSON, 1);
```

### Custom transformers

If you need to preprocess each node, it's still possible to do with provided function.

```js static
import { transformer, DEFAULT_EXPAND_LEVEL } from 'uast-viewer';

// in your application
function nodeTransformer(node) {
    // your logic
    return node;
}

const flattenUAST = transformer(uastJSON, DEFAULT_EXPAND_LEVEL, nodeTransformer);
```
