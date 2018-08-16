import UASTViewer from './components/UASTViewer';
import Editor from './components/Editor';
import withUASTEditor from './withUASTEditor';
import PositionIndex from './PositionIndex';
import * as uastV1 from './uast-v1/index';
import {
  hoverNodeById,
  toggleNodeById,
  highlightNodeById,
  expandToNodeId,
  languageToMode
} from './helpers';

export default UASTViewer;
export {
  Editor,
  PositionIndex,
  withUASTEditor,
  // helpers to operate on the uast state
  hoverNodeById,
  toggleNodeById,
  highlightNodeById,
  expandToNodeId,
  // converts language to codemirror language mode
  languageToMode,
  // build-in functions to operate on UAST
  uastV1
};
