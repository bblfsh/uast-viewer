import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import PositionIndex from './PositionIndex';
import {
  hoverNodeById,
  highlightNodeById,
  expandToNodeId,
  expandRootIds
} from './helpers';
import { hocOptions as uastV1Options } from './uast-v1';

// useFlatUast hook transform input json to flat UAST consumable by UASTViewer
// inputJson - uast json in arbitrary format matching transformer
// transformer - function that converts json to flat UAST
export function useFlatUast(
  inputJson,
  transformer = uastV1Options.transformer
) {
  return useMemo(() => transformer(inputJson), [inputJson, transformer]);
}

// useUastExpanded hook expends root nodes
// inputUast - flat UAST
// rootIds - array of root nodes ids
// levelsToExpand - number of node levels to expand from rootIds
// getChildrenIds - function that returns array of all children ids for a node
export function useUastExpanded(
  inputUast,
  rootIds = [1],
  levelsToExpand = 2,
  getChildrenIds = uastV1Options.getChildrenIds
) {
  return useMemo(
    () => expandRootIds(inputUast, rootIds, levelsToExpand, getChildrenIds),
    [inputUast, rootIds, levelsToExpand]
  );
}

function usePosIndex(
  inputUast,
  getNodePosition = uastV1Options.getNodePosition
) {
  function build() {
    const index = new PositionIndex();
    if (!getNodePosition) {
      return index;
    }

    Object.keys(inputUast).forEach(id => {
      const node = inputUast[id];
      const { from, to } = getNodePosition(node);
      if (!from || !to) {
        return;
      }

      index.add(node.id, [from.line, from.ch], [to.line, to.ch]);
    });
    return index;
  }

  return useMemo(() => build(), [inputUast, getNodePosition]);
}

// it is not recommended pattern
// but it's the best way to keep backward-compatibility
function useEventCallback(fn, dependencies) {
  const ref = useRef(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useEffect(
    () => {
      ref.current = fn;
    },
    [fn, ...dependencies]
  );

  return useCallback((...args) => ref.current(...args), [ref]);
}

function useUastConnect(
  inputUast,
  getNodePosition = uastV1Options.getNodePosition
) {
  const [uast, setUast] = useState(inputUast);
  const [lastHighlighted, setLastHighlighted] = useState(null);
  const [hoverPos, setHoverPos] = useState(null);
  const [clickPos, setClickPos] = useState(null);

  const posIndex = usePosIndex(inputUast, getNodePosition);

  const onNodeHover = useEventCallback(
    (id, prevId) => {
      if (!getNodePosition) {
        return;
      }

      const node = uast[id];
      const newUast = hoverNodeById(uast, id, prevId);
      setUast(newUast);

      const newHoverPos = node ? getNodePosition(node) : null;
      setHoverPos(newHoverPos);
    },
    [uast, getNodePosition]
  );

  const onNodeToggle = useEventCallback(
    id => {
      const newUast = {
        ...uast,
        [id]: {
          ...uast[id],
          expanded: !uast[id].expanded
        }
      };
      setUast(newUast);
    },
    [uast]
  );

  const onNodeClick = useEventCallback(
    id => {
      if (!getNodePosition) {
        return;
      }

      const node = uast[id];
      const newClickPos = node ? getNodePosition(node) : null;
      setClickPos(newClickPos);
    },
    [uast, getNodePosition]
  );

  const onCursorChanged = useEventCallback(
    cursorPos => {
      const nodeId = posIndex.get(cursorPos.line, cursorPos.ch);
      if (!nodeId) {
        return;
      }

      const newUast = highlightNodeById(uast, nodeId, lastHighlighted);
      setUast(expandToNodeId(newUast, nodeId));
      setLastHighlighted(nodeId);
    },
    [uast, posIndex, lastHighlighted]
  );

  return {
    uast,
    hoverPos,
    clickPos,
    highlightedId: lastHighlighted,
    onNodeHover,
    onNodeToggle,
    onNodeClick,
    onCursorChanged
  };
}

function splitConnectProps({
  uast,
  hoverPos,
  clickPos,
  highlightedId,
  onNodeHover,
  onNodeToggle,
  onNodeClick,
  onCursorChanged
}) {
  return [
    {
      markRange: hoverPos,
      scrollToPos: clickPos,
      onCursorChanged
    },
    {
      uast,
      scrollToNode: highlightedId,
      onNodeHover,
      onNodeToggle,
      onNodeClick
    }
  ];
}

// useWithEditor hook connects Editor and UASTViewer components
// it returns array with props for each component [editorProps, viewerProps]
// props
// props.inputJson - uast json in arbitrary format matching transformer
// props.rootIds - array of root nodes ids
// props.levelsToExpand - number of node levels to expand from rootIds
// options
// options.transformer - function that converts uast json to flat uast
// options.getNodePosition - function that returns position in codemirror format from node
// options.getChildrenIds - function that returns array of all children ids for a node
export function useWithEditor(props, options = uastV1Options) {
  const { inputJson, rootIds, levelsToExpand } = props;
  const flatUast = useFlatUast(inputJson, options.transformer);
  const expandedUast = useUastExpanded(
    flatUast,
    rootIds,
    levelsToExpand,
    options.getChildrenIds
  );
  const connectProps = useUastConnect(expandedUast, options.getNodePosition);

  return splitConnectProps(connectProps);
}
