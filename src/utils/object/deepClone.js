/* eslint-disable import/prefer-default-export */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

export default function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  const props = Object.getOwnPropertyDescriptors(obj);
  for (const prop in props) {
    props[prop].value = deepClone(props[prop].value);
  }
  return Object.create(Object.getPrototypeOf(obj), props);
}
