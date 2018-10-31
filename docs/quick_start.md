`uast-viewer` is the simplest way to visualize [UAST](https://doc.bblf.sh/uast/specification.html).

## Features

 - Drop-in component to display a UAST. [Example](#!/Uncontrolled)
 - Get full control of the tree. [Example](#!/Controlled)
 - Integration with online source code editor [Example](#!/With%20source%20code)

## Installation

1. Install UAST Viewer as a dependency

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

4. Use the default `transformer` function to feed the [UAST JSON](#!/State) to the component

    ```js static
    import { uastV2 } from 'uast-viewer';
    <UASTViewer uast={uastV2.transformer(uastJSON)} />
    ```
