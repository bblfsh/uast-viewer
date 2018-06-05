export function hoverNodeById(uast, id, prevId) {
  if (prevId === id) {
    return uast;
  }

  let newUast = uast;
  const node = uast[id];
  if (node) {
    newUast = {
      ...newUast,
      [id]: {
        ...node,
        hovered: true
      }
    };
  }
  if (prevId !== null) {
    newUast = {
      ...newUast,
      [prevId]: {
        ...newUast[prevId],
        hovered: false
      }
    };
  }

  return newUast;
}

export function toggleNodeById(uast, id) {
  return {
    ...uast,
    [id]: {
      ...uast[id],
      expanded: !uast[id].expanded
    }
  };
}

export function highlightNodeById(uast, id, prevId) {
  if (prevId === id) {
    return uast;
  }

  let newUast = uast;
  const node = uast[id];
  if (node) {
    newUast = {
      ...newUast,
      [id]: {
        ...node,
        highlighted: true
      }
    };
  }
  if (prevId !== null) {
    newUast = {
      ...newUast,
      [prevId]: {
        ...newUast[prevId],
        highlighted: false
      }
    };
  }

  return newUast;
}

// expands all nodes from the root to id
export function expandToNodeId(uast, id) {
  let nodeId = id;
  let newUast = uast;
  while (nodeId) {
    newUast = {
      ...newUast,
      [nodeId]: {
        ...uast[nodeId],
        expanded: true
      }
    };
    nodeId = uast[nodeId].parentId;
  }
  return newUast;
}

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

export function makePositionIndexHook(posIndex) {
  return function posIndexHook(node) {
    posIndex.add({
      id: node.id,
      start: node.StartPosition,
      end: node.EndPosition
    });
    return node;
  };
}
