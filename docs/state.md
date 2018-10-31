All components use flat object representation of UAST, instead of default UAST tree structure.

The rationale is that in default UAST tree structure:
 - nodes don't have unique identifiers
 - it is quite complex to operate on

For example, original json with 6 nodes:

```js static
{
  "@type": "File",
  ...<node properties>
  "body": [
    {
      "@type": "uast:FunctionGroup"
      ...<node properties>
    },
    {
      "@type": "Print",
      ...<node properties>
      "values": [
        { ...<node properties> },
        { ...<node properties> },
        { ...<node properties> }
    }
}
```

In flat object representation will look like:

```js static
{
    1: {
        "id": 1,
        "@type": "File",
        ...<node properties>
        "body": [2, 3]
    },
    2: {
        "id": 2,
        "parent": 1,
        "@type": "uast:FunctionGroup"
        ...<node properties>,
    },
    3: {
        "id": 3,
        "parent": 1,
         "@type": "Print",
        ...<node properties>,
        "values": [4, 5, 6]
    },
    4: { "id": 4, "parent": 3, ...<node properties> },
    5: { "id": 5, "parent": 3, ...<node properties> },
    6: { "id": 6, "parent": 3, ...<node properties> },
}
```

The library provides build-in [function](#/State?id=uast-v2) for it and multiple helpers to manage UAST flat tree state.
