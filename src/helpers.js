/* disable because here will be more functions later,
   it's incorrect to export this function as default */
/* eslint import/prefer-default-export: 0 */
export function hoverNodeById(uast, id, prevId) {
  const node = uast[id];
  const newUast = {
    ...uast,
    [id]: {
      ...node,
      hovered: true
    }
  };
  if (prevId !== null) {
    newUast[prevId] = {
      ...newUast[prevId],
      hovered: false
    };
  }

  return newUast;
}
