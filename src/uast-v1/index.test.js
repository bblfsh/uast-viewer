import { transformer, getNodePosition } from './index';

describe('transformer', () => {
  it('returns null when uast is not present', () => {
    expect(transformer()).toBeNull();
    expect(transformer(null)).toBeNull();
  });
});

describe('getNodePosition', () => {
  it('no position', () => {
    const pos = getNodePosition({ StartPosition: null, EndPosition: null });
    expect(pos).toEqual({ from: null, to: null });
  });

  it('with start position', () => {
    const pos = getNodePosition({
      StartPosition: { Line: 2, Col: 3 },
      EndPosition: null
    });
    expect(pos).toEqual({ from: { line: 1, ch: 2 }, to: null });
  });

  it('with both positions', () => {
    const pos = getNodePosition({
      StartPosition: { Line: 2, Col: 3 },
      EndPosition: { Line: 3, Col: 10 }
    });
    expect(pos).toEqual({
      from: { line: 1, ch: 2 },
      to: { line: 2, ch: 9 }
    });
  });
});
