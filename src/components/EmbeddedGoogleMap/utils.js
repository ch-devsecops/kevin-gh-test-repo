/**
 * resolves missing title and inline styling for the arrayed elements
 * @param array
 * @param title
 */

const applyAODAHtmlStyleFix = (array, title) => {
  array.forEach(item => {
    item.setAttribute('title', title);
    item.removeAttribute('style');
    item.removeAttribute('frameborder');
  });
};

export default applyAODAHtmlStyleFix;
