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
    const start = node.StartPosition || {};
    const end = node.EndPosition || {};
    posIndex.add(node.id, [start.Line, start.Col], [end.Line, end.Col]);
    return node;
  };
}

const langToMimeModesMapping = {
  css: 'text/css',
  ecmascript: 'text/ecmascript',
  html: 'text/html',
  javascript: 'text/javascript',
  typescript: 'text/typescript',
  cpp: 'text/x-c++src',
  xml: 'text/xml',
  bash: 'text/x-sh',
  shell: 'text/x-sh'
};

// maps language name to MIME Mode recognizable by code-mirror
export function languageToMode(lang) {
  return langToMimeModesMapping[lang] || `text/x-${lang}`;
}
