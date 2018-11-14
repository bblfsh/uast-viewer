import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FlatUASTViewer from './FlatUASTViewer';
import { expandRootIds } from '../helpers';
import { hocOptions as uastV2Options } from '../uast-v2';

class UASTViewer extends PureComponent {
  render() {
    const { uast, levelsToExpand, rootIds, options, ...rest } = this.props;

    const flatUast = expandRootIds(
      options.transformer(uast),
      rootIds,
      levelsToExpand,
      options.getChildrenIds
    );

    return <FlatUASTViewer flatUast={flatUast} rootIds={rootIds} {...rest} />;
  }
}

UASTViewer.propTypes = {
  // source UAST in the format matching transformer
  uast: PropTypes.any,
  // array of root nodes ids
  rootIds: PropTypes.array.isRequired,
  // number of node levels to expand from rootIds
  levelsToExpand: PropTypes.number.isRequired,
  // options
  // options.transformer - function that converts uast to flat-json
  // options.getChildrenIds - function that returns array of all children ids
  options: PropTypes.shape({
    transformer: PropTypes.func.isRequired,
    getChildrenIds: PropTypes.func.isRequired
  }).isRequired
};

UASTViewer.defaultProps = {
  rootIds: [1],
  levelsToExpand: 2,
  options: uastV2Options
};

export default UASTViewer;
