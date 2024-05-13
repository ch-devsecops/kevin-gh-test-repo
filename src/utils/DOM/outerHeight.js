/**
 * Calculates outerHeight (box + margin) of an element
 * @param {Object} element
 * @returns {Number}
 */
export default element => {
  if (!element) {
    return 0;
  }
  let height = element?.offsetHeight;
  const style = window?.getComputedStyle(element);
  height += parseInt(style?.marginTop, 10) + parseInt(style?.marginBottom, 10);
  return height;
};
