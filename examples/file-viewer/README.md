# Simple UAST file viewer example

Build the container:

```bash
cd ./examples/file-viewer
docker build -t uast-viewer .
```

Run it:

```bash
docker run -it --rm -p 8080:3000 uast-viewer
```

Go to http://localhost:8080/ and load an UAST file with the following format:

```json
{ "code": "...", "lang": "...", "uast": {...} }
```
