export function hoverNodeById(uast, id, prevId) {
  const node = uast[id];
  const newUast = {
    ...uast,
    [id]: {
      ...node,
      hovered: true
    }
  };
  if (prevId !== null) {
    newUast[prevId] = {
      ...newUast[prevId],
      hovered: false
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
  const node = uast[id];
  const newUast = {
    ...uast,
    [id]: {
      ...node,
      highlighted: true
    }
  };
  if (prevId !== null) {
    newUast[prevId] = {
      ...newUast[prevId],
      highlighted: false
    };
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
  };
}
