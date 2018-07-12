function findClosestNode(nodes, endIndex, targetLine, targetCol) {
  let closestEndLine = Infinity;
  let closestEndCol = Infinity;

  return nodes.reduce((prev, node) => {
    const [endLine, endCol] = endIndex[node];

    if (
      endLine < targetLine ||
      (endLine === targetLine && endCol <= targetCol) ||
      (endLine === closestEndLine && endCol > closestEndCol)
    ) {
      return prev;
    }

    closestEndLine = endLine;
    closestEndCol = endCol;

    return node;
  }, undefined);
}

export default class PositionIndex {
  constructor() {
    this.index = [];
    this.endIndex = {};
  }

  clear() {
    this.index = [];
    this.endIndex = {};
  }

  add(node, [startLine, startCol] = [], [endLine, endCol] = []) {
    if (!startLine || !startCol || !endLine || !endCol) {
      return;
    }

    const idx = this.index;
    this.endIndex[node] = [endLine, endCol];

    if (!idx[startLine]) {
      idx[startLine] = [];
      idx[startLine][startCol] = [node];
      return;
    }

    if (!idx[startLine][startCol]) {
      idx[startLine][startCol] = [node];
      return;
    }

    // prevent duplicates on the index
    if (idx[startLine][startCol].indexOf(node) >= 0) {
      return;
    }

    idx[startLine][startCol].push(node);
  }

  get(targetLine, targetCol) {
    for (let line = targetLine; line >= 0; line--) {
      const lineNodes = this.index[line];
      if (!lineNodes) {
        continue;
      }

      let col = line === targetLine ? targetCol : lineNodes.length - 1;
      for (col; col >= 0; col--) {
        const colNodes = lineNodes[col];
        if (!colNodes) {
          continue;
        }

        const found = findClosestNode(
          colNodes,
          this.endIndex,
          targetLine,
          targetCol
        );
        if (found) {
          return found;
        }
      }
    }

    return undefined;
  }
}
