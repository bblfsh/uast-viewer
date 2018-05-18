function hasEnd(node) {
  return node.end && node.end.Line && node.end.Col;
}

function endsAfter(node, targetLine, targetCol) {
  return (
    node.end.Line > targetLine ||
    (node.end.Line === targetLine && node.end.Col > targetCol)
  );
}

function findSmallerContainerInColNodes(columnNodes, targetLine, targetCol) {
  let candidateNode;
  let closestEndLine = Number.MAX_VALUE;
  let closestEndCol = Number.MAX_VALUE;

  columnNodes.forEach(node => {
    if (!hasEnd(node) || !endsAfter(node, targetLine, targetCol)) {
      return;
    }

    if (
      node.end.Line < closestEndLine ||
      (node.end.Line === closestEndLine && node.end.Col < closestEndCol)
    ) {
      candidateNode = node;
      closestEndLine = node.end.Line;
      closestEndCol = node.end.Col;
    }
  });

  return candidateNode;
}

function findContainerInLineNodes(
  lineNodes,
  targetLine,
  targetCol,
  startFromTargetCol
) {
  let candidate;
  for (
    let col = startFromTargetCol ? targetCol : lineNodes.length - 1;
    col > 0;
    col--
  ) {
    if (!lineNodes[col]) {
      continue;
    }

    candidate = findSmallerContainerInColNodes(
      lineNodes[col],
      targetLine,
      targetCol
    );
    if (candidate) {
      break;
    }
  }

  return candidate;
}

function findContainer(idx, targetLine, targetCol) {
  let candidate;
  let firstLookup = true;
  for (let line = targetLine; line > 0; line--) {
    if (!idx[line]) {
      continue;
    }

    candidate = findContainerInLineNodes(
      idx[line],
      targetLine,
      targetCol,
      firstLookup
    );
    if (candidate) {
      break;
    }

    firstLookup = false;
  }

  return candidate;
}

export default class PositionIndex {
  constructor() {
    this.index = [];
  }

  clear() {
    this.index = [];
  }

  add(node) {
    if (!node.end || !node.end.Line || !node.end.Col) {
      return;
    }

    const { Line: line, Col: col } = node.start;
    const idx = this.index;

    if (!idx[line]) {
      idx[line] = [];
      idx[line][col] = [node];
      return;
    }

    if (!idx[line][col]) {
      idx[line][col] = [node];
      return;
    }

    // prevent duplicates on the index
    if (idx[line][col].indexOf(node) >= 0) {
      return;
    }

    idx[line][col].push(node);
  }

  get({ Line: line, Col: col }) {
    return findContainer(this.index, line, col);
  }
}
