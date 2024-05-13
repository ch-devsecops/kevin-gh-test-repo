/**
 * computes element length property
 * @param eleRef
 * @param cssProperty
 * @returns {number}
 */
function getComputedStyleLengthProperty(eleRef, cssProperty) {
  return parseInt(getComputedStyle(eleRef).getPropertyValue(cssProperty).replace('px', ''), 10);
}

/**
 * computes element total height
 * @param eleRef
 * @returns {number}
 */
function getElementHeight(eleRef) {
  return (
    getComputedStyleLengthProperty(eleRef, 'height') +
    getComputedStyleLengthProperty(eleRef, 'padding-top') +
    getComputedStyleLengthProperty(eleRef, 'padding-bottom')
  );
}

export default getElementHeight;
