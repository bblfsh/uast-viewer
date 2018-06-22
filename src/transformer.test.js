import transformer from './transformer';

describe('transformer', () => {
  it('returns null when uast is not present', () => {
    expect(transformer()).toBeNull();
    expect(transformer(null)).toBeNull();
  });
});
