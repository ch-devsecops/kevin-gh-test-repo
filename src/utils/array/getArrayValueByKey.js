import { flattenDeep } from 'lodash/array';

/**
 * @param source object to search within
 * @param search key to look for
 * @param particular
 * @returns {array}
 */

export default function getArrayValueByKey(source, search, particular = 'value') {
  if (!source || typeof source !== 'object') {
    return [];
  }

  const [key, next] = Object.keys(source);
  const { [key]: value, ...rest } = source;
  let finalValue = value;
  if (value?.fields?.[particular]) {
    finalValue = value.fields[particular];
  }

  return flattenDeep([
    ...(key === search ? [finalValue] : getArrayValueByKey(finalValue, search)),
    ...(next ? getArrayValueByKey(rest, search) : []),
  ]).filter(i => i);
}
