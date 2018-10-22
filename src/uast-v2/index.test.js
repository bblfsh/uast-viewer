import { transformer, getChildrenIds } from './index';

describe('transformer', () => {
  it('returns null when uast is not present', () => {
    expect(transformer()).toBeNull();
    expect(transformer(null)).toBeNull();
  });

  it('does not change input json', () => {
    const input = {
      '@type': 'node',
      child: {
        '@type': 'child'
      }
    };
    transformer(input);

    expect(input).toEqual({
      '@type': 'node',
      child: {
        '@type': 'child'
      }
    });
  });

  it('does not fail on null values', () => {
    const input = {
      '@type': 'node',
      child: {
        '@type': 'child'
      },
      childNull: null,
      children: [
        1,
        null,
        {
          '@type': 'another-child'
        }
      ]
    };

    expect(transformer(input)).toMatchSnapshot();
  });
});

describe('getChildrenIds', () => {
  it('does not fail on null values', () => {
    const n = {
      primitive: 'string',
      array: [
        1,
        null,
        {
          _uast_node_type: true,
          id: 2
        }
      ],
      null: null,
      property: {
        some: 1
      },
      child: {
        _uast_node_type: true,
        id: 3
      }
    };

    expect(getChildrenIds({ n })).toEqual([2, 3]);
  });
});
