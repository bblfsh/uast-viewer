// this file contains functions to operate on UAST v2

// special field in an object which defines distinguish just an object from a node
const typeNodeField = '_uast_node_type';
// special field name to distinguish position from regular object
const posKey = '@pos';

// returns position of a node in source code in codemirror format
export function getNodePosition({ n }) {
  const pos = { from: null, to: null };
  if (!n['@pos']) {
    return pos;
  }

  const { start, end } = n['@pos'];
  if (start && start.line && start.col) {
    pos.from = { line: start.line - 1, ch: start.col - 1 };
  }
  if (end && end.line && end.col) {
    pos.to = { line: end.line - 1, ch: end.col - 1 };
  }

  return pos;
}

// returns array of all children ids
export function getChildrenIds({ n }) {
  const ids = Object.keys(n)
    .map(key => {
      const v = n[key];
      if (Array.isArray(v)) {
        return v.filter(i => i !== null && i[typeNodeField]).map(i => i.id);
      }
      if (v && typeof v === 'object' && v[typeNodeField]) {
        return v.id;
      }
      return null;
    })
    .filter(i => !!i)
    .reduce((acc, val) => acc.concat(val), []);
  return ids;
}

// decides if an value is a node or not
// currently any object with property @type which isn't assigned to key @pos is a node
function isNode(value, key) {
  return (
    key !== posKey &&
    value !== null &&
    typeof value === 'object' &&
    value['@type']
  );
}

// we need to wrap nodeId into object to understand it's a node not just an int during render
function nodeItem(id) {
  return { id, [typeNodeField]: true };
}

// converts uast-json produced by go serialization to flat-json
export function transformer(uastJson) {
  if (!uastJson) {
    return null;
  }

  const tree = {};
  let id = 0;

  function convertNode(uast, parentId) {
    const curId = id + 1;
    id = curId;

    const node = {
      n: { ...uast },
      id: curId,
      parentId
    };

    Object.keys(uast).forEach(key => {
      const v = uast[key];

      if (Array.isArray(v)) {
        node.n[key] = uast[key].map(child => {
          if (isNode(child, key)) {
            return nodeItem(convertNode(child, curId));
          }
          return child;
        });
      }

      if (isNode(v, key)) {
        node.n[key] = nodeItem(convertNode(v, curId));
      }
    });

    tree[curId] = node;

    return curId;
  }

  convertNode(uastJson, 0);
  return tree;
}

// checks if all items have the same type and return it or 'any'
function itemsType(items) {
  if (!items.length) {
    return 'any';
  }

  let { type } = items[0];
  const valueTypes =
    typeof type === 'undefined' // primitive type like string
      ? items.map(i => (i !== null && i.attr ? i.attr() : i)).map(v => typeof v)
      : items.map(i => i.type);

  if (new Set(valueTypes).size > 1) {
    return 'any';
  }

  [type] = valueTypes;

  return type;
}

// uast2 doesn't have defined schema
// this function inspects input and generates
function fieldFromValue(value, key) {
  if (typeof value !== 'object' || value === null) {
    return { name: key, showEmpty: true, attr: () => value };
  }

  if (Array.isArray(value)) {
    const items = value.map(v => fieldFromValue(v));
    return {
      name: key,
      type: 'array',
      label: `[]${itemsType(items)}`,
      attr: () => items
    };
  }

  if (value[typeNodeField]) {
    return {
      name: key,
      type: 'node',
      label: key,
      attr: () => value.id
    };
  }

  const items = Object.keys(value).reduce((acc, k) => {
    const v = value[k];
    acc[k] = v && typeof v === 'object' ? fieldFromValue(v, k) : v;
    return acc;
  }, {});

  if (key === posKey) {
    return {
      name: key,
      type: 'location',
      label: 'Position',
      attr: () => items
    };
  }

  return {
    name: key,
    type: 'object',
    label: `map<string,${itemsType(Object.values(items))}>`,
    attr: () => items
  };
}

export function nodeSchema({ n }) {
  return Object.keys(n).map(key => fieldFromValue(n[key], key));
}

export const hocOptions = {
  transformer,
  getNodePosition,
  getChildrenIds
};
