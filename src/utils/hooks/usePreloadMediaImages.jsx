import isSSR from '../isSSR';
/**
 * Force browser to load image(s) pre render
 * @param { string | string[] }  url
 * @returns {void}
 */
const setImageSrc = url => {
  if (!url) return;
  const img = new Image();
  img.src = url;
};

const usePreloadMediaImages = urls => {
  if (isSSR) return;

  if (Array.isArray(urls) && urls.length) {
    urls.forEach(url => {
      setImageSrc(url);
    });
  }
  if (typeof urls === 'string') {
    setImageSrc(urls);
  }
};

export default usePreloadMediaImages;
