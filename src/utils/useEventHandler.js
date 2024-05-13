import keyCodes from '@honda-canada/js-utilities/lib/keyCodes';

/**
 * Hook for implementation onClick and onKeyDown (only ENTER) event handler
 * @param {Function/*} data - function or data(any) as prop for handler
 * @param {Boolean} isLink - is element  Link
 * @param {Event} event - click/press event
 * @returns func
 */
const useEventHandler = handler => (data, isLink, event) => {
  if (!isLink) {
    if (event) {
      if (event.keyCode === keyCodes.ENTER) {
        event.stopPropagation();
        handler(data);
      }
    } else {
      handler(data);
    }
  }
};

export default useEventHandler;
