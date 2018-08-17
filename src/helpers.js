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

function collectExpandIds(nodes, children, level, getChildrenIds) {
  if (level === 0) {
    return children;
  }
  if (!children.length) {
    return [];
  }

  const ids = children.reduce(
    (acc, id) => acc.concat(getChildrenIds(nodes[id])),
    []
  );

  return children
    .concat(ids)
    .concat(collectExpandIds(nodes, ids, level - 1, getChildrenIds));
}

// expands levelsToExpand nodes from rootIds
export function expandRootIds(uast, rootIds, levelsToExpand, getChildrenIds) {
  const idsToExpand = collectExpandIds(
    uast,
    rootIds,
    levelsToExpand,
    getChildrenIds
  );
  return Object.keys(uast).reduce((acc, id) => {
    const expanded = idsToExpand.includes(+id);
    acc[id] = {
      ...uast[id],
      expanded,
      highlighted: false
    };
    return acc;
  }, {});
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
