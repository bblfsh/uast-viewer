export function hoverNodeById(flatUast, id, prevId) {
  if (prevId === id) {
    return flatUast;
  }

  let newUast = flatUast;
  const node = flatUast[id];
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

export function toggleNodeById(flatUast, id) {
  return {
    ...flatUast,
    [id]: {
      ...flatUast[id],
      expanded: !flatUast[id].expanded
    }
  };
}

export function highlightNodeById(flatUast, id, prevId) {
  if (prevId === id) {
    return flatUast;
  }

  let newUast = flatUast;
  const node = flatUast[id];
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
export function expandToNodeId(flatUast, id) {
  let nodeId = id;
  let newUast = flatUast;
  while (nodeId) {
    newUast = {
      ...newUast,
      [nodeId]: {
        ...flatUast[nodeId],
        expanded: true
      }
    };
    nodeId = flatUast[nodeId].parentId;
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
export function expandRootIds(
  flatUast,
  rootIds,
  levelsToExpand,
  getChildrenIds
) {
  const idsToExpand = collectExpandIds(
    flatUast,
    rootIds,
    levelsToExpand,
    getChildrenIds
  );
  return Object.keys(flatUast).reduce((acc, id) => {
    const expanded = idsToExpand.includes(+id);
    acc[id] = {
      ...flatUast[id],
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
