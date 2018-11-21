import React from 'react';
import renderer from 'react-test-renderer';
import FlatUASTViewer from './FlatUASTViewer';

const flatUast2 = {
  1: { n: { name: 'original-node' }, expanded: true }
};

const flatUast2Changed = {
  1: { n: { name: 'changed-node' }, expanded: true }
};

describe('FlatUASTViewer', () => {
  it('uncontrolled', () => {
    const testRenderer = renderer.create(
      <FlatUASTViewer initialFlatUast={flatUast2} />
    );

    const originalTree = testRenderer.toJSON();

    testRenderer.update(<FlatUASTViewer initialFlatUast={flatUast2Changed} />);

    const updatedTree = testRenderer.toJSON();

    expect(originalTree).toEqual(updatedTree);
  });

  it('controlled', () => {
    const testRenderer = renderer.create(
      <FlatUASTViewer flatUast={flatUast2} />
    );

    const originalTree = testRenderer.toJSON();
    expect(
      testRenderer.root.findByProps({ className: 'uast-value string' }).children
    ).toEqual(['original-node']);

    testRenderer.update(<FlatUASTViewer flatUast={flatUast2Changed} />);

    const updatedTree = testRenderer.toJSON();

    expect(originalTree).not.toEqual(updatedTree);
    expect(
      testRenderer.root.findByProps({ className: 'uast-value string' }).children
    ).toEqual(['changed-node']);
  });
});
