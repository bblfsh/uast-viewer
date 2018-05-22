The UAST has tree structure which is difficult to operate on and nodes don't have unique identifier.

That's why components require transformation to flat object.

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

Must be transformed to the structure:

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
