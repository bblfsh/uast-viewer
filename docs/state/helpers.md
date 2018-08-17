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

### languageToMode

Maps language name to MIME Mode recognizable by code-mirror.

Example usage:

```js
const { languageToMode } = require('uast-viewer');

const langs = ['java', 'bash', 'javascript'];

<table>
    <tr>
        <th>Language</th>
        <th>Mode</th>
    </tr>
{langs.map(lang => (
    <tr key={lang}>
        <td>{lang}</td>
        <td>-&gt; {languageToMode(lang)}</td>
    </tr>)
)}
</table>
```
