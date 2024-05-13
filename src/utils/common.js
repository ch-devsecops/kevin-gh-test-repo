/**
 * Converts the Web Catalog version of a boolean value ('1') into an actual boolean value.
 *
 * @param {any} val
 * @returns {boolean}
 */
export const parseBool = val => {
  if (typeof val === 'boolean') {
    return val;
  }
  return val === '1';
};

/*
NOTE: smooth scrollTo behaviour doesn't work in iOS 15.x, hence using
this workaround to set scrollTo behaviour to auto in iOS 15.x until bug fix is implemented by Apple
*/
/**
 * Sets scroll behaviour based on browser vendor, i.e., auto for Safari, smooth otherwise.
 * @param {object} navigator
 * @returns {string}
 */
export const getScrollBehaviour = navigator => (/(apple)/i.test(navigator.vendor) ? 'auto' : 'smooth');
