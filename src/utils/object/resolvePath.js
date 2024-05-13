/* eslint-disable no-restricted-globals */
/* eslint-disable import/prefer-default-export */
/**
 * Access nested property in obj using string path
 *
 * @param {string} path - Path to property
 * @param {Object} [obj=self]
 * @param {string} [separator='.']
 * @return {*} - Returns nested property
 */
export default (path, obj = self, separator = '.') => {
  const properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev?.[curr], obj);
};
