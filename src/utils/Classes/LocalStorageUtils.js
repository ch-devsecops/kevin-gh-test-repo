import isSSR from '../isSSR';

export default class LocalStorageUtils {
  /**
   * Checks if an item is not null or undefined
   * @param {any} item
   * @returns boolean
   */
  static #isValidArrayItem(item) {
    return typeof item !== 'undefined' && item !== null;
  }

  /**
   * Checks if a key exists in window.localStorage
   * @param {string} key
   * @returns boolean
   */
  static isKeyInStorage(key) {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null;
  }

  /**
   * Checks if value is a valid array
   * @param {any} value
   * @returns boolean
   */
  static #isValidArray(value) {
    return Array.isArray(value);
  }

  /**
   * Adds item to an existing array in window.localStorage
   * @param {string} key
   * @param {string} item
   * @returns {Promise<array> | undefined} updated array
   */
  static addItem(key, item) {
    if (isSSR()) return;
    return new Promise((resolve, reject) => {
      try {
        if (!this.#isValidArrayItem(item)) {
          reject(new TypeError('item can not be null or undefined'));
          return;
        }
        if (!this.isKeyInStorage(key)) {
          reject(new ReferenceError(`Array with key: ${key} does not exists in window.localStorage`));
          return;
        }
        const storedValue = localStorage.getItem(key);
        const parsedValue = JSON.parse(storedValue);

        if (!this.#isValidArray(parsedValue)) {
          reject(new TypeError(`Value with key:${key} is not of type array`));
          return;
        }

        parsedValue.push(item);
        const serializedValue = JSON.stringify(parsedValue);
        localStorage.setItem(key, serializedValue);

        resolve(parsedValue);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Removes item from an existing array in window.localStorage
   * @param {string} key
   * @param {string} item
   * @returns {Promise<array> | undefined} updated array
   */
  static removeItem(key, item) {
    if (isSSR()) return;
    return new Promise((resolve, reject) => {
      try {
        if (!this.#isValidArrayItem(item)) {
          reject(new TypeError('item can not be null or undefined'));
          return;
        }
        if (!this.isKeyInStorage(key)) {
          reject(new ReferenceError(`Array with ${key} does not exists in window.localStorage`));
          return;
        }

        const storedValue = localStorage.getItem(key);
        const parsedValue = JSON.parse(storedValue);

        if (!this.#isValidArray(parsedValue)) {
          reject(new TypeError(`Value for key ${key} is not of type array`));
          return;
        }

        const filteredValue = parsedValue.filter(prevItem => prevItem !== item);
        const serializedValue = JSON.stringify(filteredValue);
        localStorage.setItem(key, serializedValue);

        resolve(filteredValue);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Creates new key-value pair in window.localStorage
   * @param {string} key
   * @param {array} value
   * @returns {Promise<array> | undefined} newly stored array
   */
  static createArray(key, value) {
    if (isSSR()) return;
    return new Promise((resolve, reject) => {
      try {
        if (!this.#isValidArray(value)) {
          reject(new TypeError(`The ${value} is not of type array`));
          return;
        }

        if (this.isKeyInStorage(key)) {
          reject(new Error(`${key} already exists in window.localstorage`));
          return;
        }

        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);

        resolve(value);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Deletes key from window.localStorage
   * @param {string} key
   * @returns {Promise<array> | undefined}
   */
  static deleteArray(key) {
    if (isSSR()) return;
    return new Promise((resolve, reject) => {
      try {
        if (!this.isKeyInStorage(key)) {
          reject(new ReferenceError(`Array with ${key} does not exists in window.localStorage`));
          return;
        }

        localStorage.removeItem(key);
        resolve(undefined);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Returns array for given existing key in window.localStorage
   * @param {string} key
   * @returns {Promise<array> | undefined}
   */
  static getArray(key) {
    if (isSSR()) return;
    return new Promise((resolve, reject) => {
      try {
        if (!this.isKeyInStorage(key)) {
          reject(new ReferenceError(`Array with ${key} does not exists in window.localStorage`));
          return;
        }

        const storedValue = localStorage.getItem(key);
        const parsedValue = JSON.parse(storedValue);

        if (!this.#isValidArray(parsedValue)) {
          reject(new TypeError(`Value with key:${key} is not of type array`));
          return;
        }

        resolve(parsedValue);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Replaces value for a given existing key in browsers' localStorage
   * @param {string} key
   * @param {array} value
   * @returns {Promise<array> | undefined} updated array
   * */
  static replaceArray(key, value) {
    if (isSSR()) return;
    return new Promise((resolve, reject) => {
      try {
        if (!this.#isValidArray(value)) {
          reject(new TypeError(`The ${value} is not of type array`));
          return;
        }
        if (!this.isKeyInStorage(key)) {
          reject(new ReferenceError(`Array with ${key} does not exists in window.localStorage`));
          return;
        }

        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);

        resolve(value);
      } catch (error) {
        reject(error);
      }
    });
  }
}
