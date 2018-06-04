All components use flat object representation of UAST, instead of default UAST tree structure.

The rationale is that in default UAST tree structure:
 - nodes don't have unique identifiers
 - it is quite complex to operate on

For example, original json with 6 nodes:

```js static
{
  ...<node properties>
  Children: [
    {
      ...<node properties>
      Children: []
    },
    {
      ...<node properties>
      Children: [
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
        id: 1,
        ...<node properties>
        Children: [2, 3]
    },
    2: {
        id: 2,
        ...<node properties>,
        Children: []
    },
    3: {
        id: 3,
        ...<node properties>,
        Children: [4, 5, 6]
    },
    4: { id: 4, ...<node properties> },
    5: { id: 5, ...<node properties> },
    6: { id: 6, ...<node properties> },
}
```

The library provides build-in [function](#!/JSON%20convertor) for it and multiple helpers to manage UAST flat tree state.
