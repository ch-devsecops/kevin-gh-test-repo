import isSSR from './isSSR';

/**
 * Gets computed styles from dom element
 * @param para
 * @param pseudo // optional to get pseudo element
 * @return {object}
 */
export default function getElementComputedStyles(params, pseudo) {
  if (isSSR()) return {};
  // get Window reference from element
  const win = params?.[0]?.ownerDocument?.defaultView;
  // use getComputedStyle to read the pseudo selector
  const styles = win?.getComputedStyle(params?.[0], pseudo);

  return styles;
}
