Hooks are a new feature proposal that lets you use state and other React features without writing a class. They’re currently in React v16.7.0-alpha and being discussed in an open RFC.

### useFlatUast

useFlatUast hook transform input json to flat UAST consumable by UASTViewer.

```js
const { useFlatUast } = require('uast-viewer');

function MyComponent() {
    const flatUast = useFlatUast(uastSmall);
    return <UASTViewer uast={flatUast} />
}

<MyComponent />
```

### useUastExpanded

useUastExpanded hook expends root nodes.

```js
const { useFlatUast, useUastExpanded } = require('uast-viewer');

function MyComponent() {
    const flatUast = useFlatUast(uastSmall);
    const expanded = useUastExpanded(flatUast, [1], 0);
    return <UASTViewer uast={expanded} />
}

<MyComponent />
```

### useWithEditor

useWithEditor hook connects `Editor` and `UASTViewer` components.

```js
const { Editor, useWithEditor } = require('uast-viewer');

// define layout for source code editor and UAST Viewer
function Layout({code, inputJson, languageMode}) {
  const [editorProps, viewerProps] = useWithEditor({ inputJson });

  return (
    <div className="example-layout">
      <Editor
        code={code}
        languageMode={languageMode}
        {...editorProps}
      />
      <UASTViewer {...viewerProps} />
    </div>
  );
}

// Render both components
<Layout
    code={sourceCode.default}
    languageMode="text/x-java"
    inputJson={uast}
/>
```
