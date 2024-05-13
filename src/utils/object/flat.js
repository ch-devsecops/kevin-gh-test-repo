/* eslint-disable no-param-reassign */

/**
 * Flattens an object
 * @param {Object}
 * @param {*} obj
 * @param {*} out
 * example:
 * {
 *   user: {
 *     id: 'string',
 *     name: 'string',
 *   },
 *   finished: 'boolean',
 *   path: 'boolean',
 * }
 * To
 * {
 *   id: "string",
 *   name: "string",
 *   finished: "boolean",
 *   path: "boolean"
 * }
 * @returns {Object}
 */
export default function flat(obj, out = {}) {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object') {
      out = flat(obj[key], out); // recursively call for nested
    } else {
      out[key] = obj[key]; // direct assign for values
    }
  });
  return out;
}
