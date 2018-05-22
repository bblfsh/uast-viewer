export const DEFAULT_EXPAND_LEVEL = 2;

function transformer(uastJson, expandLevel = DEFAULT_EXPAND_LEVEL, ...hooks) {
  const tree = {};
  let id = 0;

  function convertNode(uast, level, parentId) {
    const curId = id + 1;
    id = curId;

    const node = {
      ...uast,
      id: curId,
      expanded: level < expandLevel,
      parentId
    };
    if (node.Children) {
      node.Children = node.Children.map(child =>
        convertNode(child, level + 1, curId)
      );
    }
    tree[curId] = hooks.reduce((n, hook) => hook(n), node);

    return curId;
  }

  convertNode(uastJson, 0);
  return tree;
}

export default transformer;
