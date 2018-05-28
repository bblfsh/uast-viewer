[![Build Status](https://travis-ci.org/src-d/uast-viewer.svg)](https://travis-ci.org/src-d/uast-viewer)

# UAST Viewer

`uast-viewer` is the simplest way to visualize [Universal Abstract Syntax Trees (UASTs)](https://doc.bblf.sh/uast/specification.html).

## Features

 - Drop-in component to display a UAST. [Example](#!/Uncontrolled)
 - Get full control of the tree. [Example](#!/Controlled)
 - Integration with online source code editor [Example](#!/With%20source%20code)

## Documentation

See the [documentation](#link-placeholder) with live examples.

## Installation

1. Install UAST Viewer as a dependency

    ```bash
    # Yarn
    $ yarn add uast-viewer

    # NPM
    $ npm install uast-viewer
    ```

2. Import `uast-viewer` module

    ```js
    import UASTViewer from 'uast-viewer';
    ```

3. Import styles by including `default-theme.css`

    ```js
    import 'uast-viewer/dist/default-theme.css';
    ```

4. Use the default `transformer` function to feed the UAST JSON to the component

    ```js
    import { transformer } from 'uast-viewer';
    <UASTViewer uast={transformer(uastJSON)} />
    ```


## Contribute

[Contributions](https://github.com/src-d/uast-viewer/issues) are more than welcome, if you are interested please take a look to our [Contributing Guidelines](CONTRIBUTING.md).


## Code of Conduct

All activities under source{d} projects are governed by the [source{d} code of conduct](https://github.com/src-d/guide/blob/master/.github/CODE_OF_CONDUCT.md).


## License

Apache License Version 2.0, see [LICENSE](LICENSE)
