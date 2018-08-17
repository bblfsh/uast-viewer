import { hoverNodeById, toggleNodeById, highlightNodeById } from './helpers';

describe('hoverNodeById', () => {
  const uast = {
    1: { id: 1, hovered: false },
    2: { id: 2, hovered: false }
  };

  it('without prevId', () => {
    const res = hoverNodeById(uast, 1, null);
    expect(res).toEqual({
      1: { id: 1, hovered: true },
      2: { id: 2, hovered: false }
    });
  });

  it('should remove hover from prev node', () => {
    const hoverFirst = hoverNodeById(uast, 1, null);
    const res = hoverNodeById(hoverFirst, 2, 1);
    expect(res).toEqual({
      1: { id: 1, hovered: false },
      2: { id: 2, hovered: true }
    });
  });

  it('id == prevId', () => {
    const res = hoverNodeById(uast, 1, 1);
    expect(res).toEqual(uast);
  });

  it('node does not exist', () => {
    const res = hoverNodeById(uast, 10, null);
    expect(res).toEqual(uast);
  });
});

describe('toggleNodeById', () => {
  const uast = {
    1: { id: 1, expanded: false },
    2: { id: 2, expanded: false }
  };

  it('expand', () => {
    const res = toggleNodeById(uast, 1);
    expect(res).toEqual({
      1: { id: 1, expanded: true },
      2: { id: 2, expanded: false }
    });
  });

  it('collapse', () => {
    const expanded = toggleNodeById(uast, 1);
    const res = toggleNodeById(expanded, 1);
    expect(res).toEqual({
      1: { id: 1, expanded: false },
      2: { id: 2, expanded: false }
    });
  });
});

describe('highlightNodeById', () => {
  const uast = {
    1: { id: 1, highlighted: false },
    2: { id: 2, highlighted: false }
  };

  it('without prevId', () => {
    const res = highlightNodeById(uast, 1, null);
    expect(res).toEqual({
      1: { id: 1, highlighted: true },
      2: { id: 2, highlighted: false }
    });
  });

  it('should remove highlighted from prev node', () => {
    const hoverFirst = highlightNodeById(uast, 1, null);
    const res = highlightNodeById(hoverFirst, 2, 1);
    expect(res).toEqual({
      1: { id: 1, highlighted: false },
      2: { id: 2, highlighted: true }
    });
  });

  it('id == prevId', () => {
    const res = highlightNodeById(uast, 1, 1);
    expect(res).toEqual(uast);
  });

  it('node does not exist', () => {
    const res = highlightNodeById(uast, 10, null);
    expect(res).toEqual(uast);
  });
});
