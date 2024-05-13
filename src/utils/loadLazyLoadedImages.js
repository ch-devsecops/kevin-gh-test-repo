import isSSR from './isSSR';

/**
 * utility that loads lazy loaded images
 * developed primarily for images loaded inside an accordion, hidden element.
 * @param {string} parent
 */
const loadLazyLoadedImages = parent => {
  if (isSSR()) return;
  document.querySelectorAll(`${parent} img[loading='lazy']`).forEach(img => {
    img.removeAttribute('loading');
  });
};

export default loadLazyLoadedImages;
