import FlatUASTViewer from './components/FlatUASTViewer';
import UASTViewer from './components/UASTViewer';
import Editor from './components/Editor';
import withUASTEditor from './withUASTEditor';
import PositionIndex from './PositionIndex';
import * as uastV1 from './uast-v1/index';
import * as uastV2 from './uast-v2/index';
import {
  hoverNodeById,
  toggleNodeById,
  highlightNodeById,
  expandToNodeId,
  expandRootIds,
  languageToMode
} from './helpers';

export default UASTViewer;
export {
  FlatUASTViewer,
  Editor,
  PositionIndex,
  withUASTEditor,
  // helpers to operate on the uast state
  hoverNodeById,
  toggleNodeById,
  highlightNodeById,
  expandToNodeId,
  expandRootIds,
  // converts language to codemirror language mode
  languageToMode,
  // build-in functions to operate on UAST
  uastV1,
  uastV2
};
