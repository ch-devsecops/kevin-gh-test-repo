import isObject from 'lodash/isObject';

/**
 * It stringify Obj/Arr to JSON safely when malformed
 * @param obj Object or Array
 * @returns string
 */
function safelyStringifyJSON(obj) {
  if (!isObject(obj)) return '';

  try {
    return JSON.stringify(obj);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(err);
    return {};
  }
}

export default safelyStringifyJSON;
