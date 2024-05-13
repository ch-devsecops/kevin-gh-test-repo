import { flattenDeep } from 'lodash/array';
/**
 * @param source object to search within
 * @param search key to look for
 * @returns {array}
 */

export default function getValueByKey(source, search) {
  if (!source || typeof source !== 'object') {
    return [];
  }

  const [key, next] = Object.keys(source);
  const { [key]: value, ...rest } = source;

  return flattenDeep([
    ...(key === search ? [value] : getValueByKey(value, search)),
    ...(next ? getValueByKey(rest, search) : []),
  ]);
}
