// this file contains functions to operate on UAST v1

// converts uast-json produced by go serialization to flat-json
export function transformer(uastJson) {
  if (!uastJson) {
    return null;
  }

  const tree = {};
  let id = 0;

  function convertNode(uast, level, parentId) {
    const curId = id + 1;
    id = curId;

    const node = {
      ...uast,
      id: curId,
      parentId
    };
    if (node.Children) {
      node.Children = node.Children.map(child =>
        convertNode(child, level + 1, curId)
      );
    }
    tree[curId] = node;

    return curId;
  }

  convertNode(uastJson, 0);
  return tree;
}

// returns position of a node in source code in codemirror format
export function getNodePosition(node) {
  const { StartPosition: start, EndPosition: end } = node;

  let from = null;
  let to = null;
  if (start && start.Line && start.Col) {
    from = {
      line: start.Line - 1,
      ch: start.Col - 1
    };
  }

  if (end && end.Line && end.Col) {
    to = {
      line: end.Line - 1,
      ch: end.Col - 1
    };
  }

  return { from, to };
}

// returns array of all children ids
export function getChildrenIds(node) {
  return node.Children;
}

export const hocOptions = {
  transformer,
  getNodePosition,
  getChildrenIds
};
