import { transformer, getChildrenIds, nodeSchema } from './index';

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

  it('empty array should be transformed correctly', () => {
    const input = [];
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

describe('nodeSchema', () => {
  it('primitives types', () => {
    const n = {
      string: 'value',
      integer: 1,
      boolean: true,
      null: null,
      // eslint-disable-next-line
      undefined: undefined
    };

    const fields = nodeSchema({ n });
    expect(fields).toMatchSnapshot();
    fields.forEach(field => {
      expect(field.attr()).toEqual(n[field.name]);
    });
  });

  it('simple object', () => {
    const n = {
      objectEmpty: {},
      objectNull: { key: null },
      objectUndefined: { key: undefined },
      objectSingle: { key: 'value' },
      objectString: { key: 'value', key2: 'value2' },
      objectInt: { key: 1, key2: 2 },
      // eslint-disable-next-line
      objectMixed: { key: 'value', int: 1, null: null, undefined: undefined }
    };

    const fields = nodeSchema({ n });
    expect(fields).toMatchSnapshot();
    fields.forEach(field => {
      expect(field.attr()).toEqual(n[field.name]);
    });
  });

  it('location object', () => {
    const n = {
      '@pos': {
        '@type': 'uast:Positions',
        end: { '@type': 'uast:Position', col: 0, line: 2, offset: 446 },
        start: { '@type': 'uast:Position', col: 1, line: 1, offset: 0 }
      }
    };

    const fields = nodeSchema({ n });
    expect(fields).toHaveLength(1);

    const field = fields[0];
    expect(field).toMatchSnapshot();

    const value = field.attr();
    expect(value).toMatchSnapshot();
  });

  it('node object', () => {
    const n = {
      someNode: {
        id: 10,
        _uast_node_type: true
      }
    };

    const fields = nodeSchema({ n });
    expect(fields).toMatchSnapshot();
    expect(fields[0].attr()).toEqual(10);
  });

  it('array', () => {
    const n = {
      emptyArray: [],
      nullArray: [null],
      undefinedArray: [undefined],
      arrayPrimitives: [1, 2, 3],
      arrayMixed: [1, { key: 'value' }, null, undefined],
      arrayOfNodes: [
        {
          id: 10,
          _uast_node_type: true
        }
      ],
      arraySimpleObjectWithKeyType: [
        {
          type: 'something'
        }
      ]
    };

    const fields = nodeSchema({ n });
    expect(fields).toMatchSnapshot();

    // make sure array items return correct attr

    expect(fields[0].attr()).toEqual([]);
    expect(fields[1].attr().map(v => v.attr())).toEqual([null]);
    expect(fields[2].attr().map(v => v.attr())).toEqual([undefined]);

    const field3Values = fields[3].attr();
    expect(field3Values.filter(f => f.name)).toHaveLength(0);
    expect(field3Values.filter(f => f.type)).toHaveLength(0);
    expect(field3Values.filter(f => f.label)).toHaveLength(0);
    expect(field3Values.map(v => v.attr())).toEqual([1, 2, 3]);

    const field4Values = fields[4].attr();
    expect(field4Values.filter(f => f.name)).toHaveLength(0);
    expect(field4Values[0].type).toBeUndefined();
    expect(field4Values[0].label).toBeUndefined();
    expect(field4Values[1].type).toEqual('object');
    expect(field4Values[1].label).toEqual('map<string,string>');
    expect(field4Values.map(v => v.attr())).toEqual([
      1,
      { key: 'value' },
      null,
      undefined
    ]);

    const field5Values = fields[5].attr();
    expect(field5Values[0].type).toEqual('node');
    expect(field5Values[0].label).toBeUndefined();
    expect(field5Values.map(v => v.attr())).toEqual([10]);
  });
});
