/* eslint-disable no-param-reassign */

/**
 * This function allows you to convert a JSS object into a simplified object.
 * The best way to understand what a function does is to look at the tests.
 * ../__tests__/object.test.js
 * They display the key feature, namely:
 * 1) Removing fields and transferring all children to the parent
 * 2) Getting rid of value for each prop
 * 3) Works correctly with nested value: {value: {value: 'something'}}
 * 4) Special parent parameters are prefixed with `item${oldName}`
 * @param {object} src
 * @returns simplified object
 */
export default function createObjectFromProps(src) {
  let outputObj = null;

  if (typeof src === 'object' && src !== null && Object.keys(src).find(i => i.includes('editable'))) {
    delete src.editable;
    delete src.editableFirstPart;
    delete src.editableLastPart;
  }
  if (src?.componentName) {
    const { uid, componentName, dataSource, params } = src;
    outputObj = { ...outputObj, uid, componentName, dataSource, params };
  }

  if (src?.displayName) {
    const { id, url, name, displayName } = src;
    outputObj = { ...outputObj, itemId: id, itemUrl: url, itemName: name, itemDisplayName: displayName };
  }

  if (src?.fields) {
    outputObj = {
      ...outputObj,
      ...Object.keys(src.fields).reduce((acc, key) => {
        if (key === 'items') {
          return acc;
        }
        acc[key] = createObjectFromProps(src.fields[key]);
        return acc;
      }, {}),
    };
  }

  if (src?.fields?.items) {
    outputObj.items = src?.fields?.items.map(item => createObjectFromProps(item));
  }

  if (src?.value !== undefined && src?.value !== null && Object.keys(src).length === 1) {
    outputObj = createObjectFromProps(src?.value);
  }

  if (typeof src?.value === 'boolean') {
    outputObj = src?.value;
  }

  if (Array.isArray(src)) {
    outputObj = src?.map(item => createObjectFromProps(item));
  }

  if (typeof src === 'string') {
    outputObj = src;
  }

  if (outputObj === null && typeof src === 'object' && src !== null) {
    outputObj = Object.keys(src).reduce((acc, key) => {
      acc[key] = createObjectFromProps(src[key]);
      return acc;
    }, {});
  }

  if (typeof outputObj === 'undefined') {
    outputObj = src;
  }

  return outputObj;
}
