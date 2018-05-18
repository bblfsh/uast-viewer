`uast-viewer` is the simplest way to visualize [UAST](https://doc.bblf.sh/uast/specification.html).

## Features

 - Drop-in component to display uast. [Example](#!/Uncontrolled)
 - Get full control of the tree. [Example](#!/Controlled)
 - Integration with online source code editor [Example](#todo)

## Installation

1. Install Uast Viewer as a dependency

    ```bash
    # Yarn
    $ yarn add uast-viewer

    # NPM
    $ npm install uast-viewer
    ```

2. Import `uast-viewer` module

    ```js static
    import UASTViewer from 'uast-viewer';
    ```

3. Import styles by including `default-theme.css`

    ```js static
    import 'uast-viewer/dist/default-theme.css';
    ```

4. Use default `transformer` function to feed the component with UAST json

    ```js static
    import { transformer } from 'uast-viewer';
    <UASTViewer uast={transformer(uastJSON)} />
    ```
