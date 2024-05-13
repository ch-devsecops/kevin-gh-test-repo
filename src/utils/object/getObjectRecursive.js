import { flatten } from 'lodash/array';
import isObject from 'lodash/isObject';

/**
 * Extract object(s) from complex object or array
 * @param {*} src - source object or array
 * @param {*} key - key to search
 * @param {*} value - value to search
 * @returns {Array} - array of objects
 */
export default function getObjectRecursive(src, key, value) {
  let ret;
  if (Array.isArray(src)) {
    ret = src.map(o => getObjectRecursive(o, key, value));
  }
  if (isObject(src)) {
    // eslint-disable-next-line eqeqeq
    if (src[key] == value) {
      return src;
    }
    ret = Object.keys(src).map(k => getObjectRecursive(src[k], key, value));
  }
  return flatten(ret);
}
