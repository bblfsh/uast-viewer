import PositionIndex from './PositionIndex';

describe('PositionIndex', () => {
  describe('add', () => {
    it('does not add a node if it has no end', () => {
      const index = new PositionIndex();
      index.add('node', [1, 1]);
      expect(index.index.length).toBe(0);
    });

    it('does not add a node if it has no end line', () => {
      const index = new PositionIndex();
      index.add('node', [1, 1], [undefined, 1]);
      expect(index.index.length).toBe(0);
    });

    it('does not add a node if it has no end col', () => {
      const index = new PositionIndex();
      index.add('node', [1, 1], [1]);
      expect(index.index.length).toBe(0);
    });

    it('adds a node with a line and col', () => {
      const index = new PositionIndex();
      index.add('node', [1, 1], [1, 1]);
      expect(index.index[1][1].length).toBe(1);
    });

    it('does not add a duplicated node', () => {
      const index = new PositionIndex();
      index.add('node', [1, 1], [1, 1]);
      index.add('node', [1, 1], [1, 1]);
      expect(index.index[1][1].length).toBe(1);
    });

    it('adds a node to the line if there are other nodes already', () => {
      const index = new PositionIndex();
      index.add('node1', [1, 1], [1, 1]);
      index.add('node2', [1, 2], [1, 4]);

      expect(index.index[1].length).toBe(3);
      expect(index.index[1][1].length).toBe(1);
      expect(index.index[1][2].length).toBe(1);
    });

    it('adds a node to the col if there are other nodes already', () => {
      const index = new PositionIndex();
      index.add('node1', [1, 1], [1, 1]);
      index.add('node2', [1, 1], [1, 4]);

      expect(index.index[1].length).toBe(2);
      expect(index.index[1][1].length).toBe(2);
    });
  });

  describe('get returns the specified node', () => {
    const index = new PositionIndex();
    index.add('parent', [1, 1], [2, 10]);
    index.add('child1', [1, 2], [1, 5]);
    index.add('child2', [1, 6], [2, 10]);

    const cases = [
      { line: 1, col: 1, expected: 'parent' },
      { line: 1, col: 2, expected: 'child1' },
      { line: 1, col: 3, expected: 'child1' },
      { line: 1, col: 5, expected: 'parent' },
      { line: 1, col: 6, expected: 'child2' },
      { line: 2, col: 6, expected: 'child2' }
    ];

    cases.forEach(c => {
      it(`expecting node at ${c.line}:${c.col} to be ${c.expected}`, () => {
        const node = index.get(c.line, c.col);
        expect(node).toBe(c.expected);
      });
    });
  });
});
