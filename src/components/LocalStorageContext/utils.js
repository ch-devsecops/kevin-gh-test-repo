import isSSR from '../../utils/isSSR';

/**
 * removes a key from window.localStorage, and sets corresponding state in context
 * @param key
 * @param setState
 * @param value
 */
export function removeLocalStorageKey(key, setState, value = false) {
  if (isSSR() || !key || !setState || typeof setState !== 'function') return;
  try {
    localStorage.removeItem(key);
    setState(value);
  } catch (error) {
    console.warn(error);
  }
}

/**
 * sets a key/value in window.localStorage, and sets corresponding state in context
 * @param key
 * @param setState
 * @param value
 */
export function setLocalStorageKey(key, setState, value = true) {
  if (isSSR() || !key || !setState || typeof setState !== 'function') return;
  try {
    localStorage.setItem(key, value?.toString());
    setState(value);
  } catch (error) {
    console.warn(error);
  }
}
