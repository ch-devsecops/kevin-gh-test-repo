/**
 * Force browser to load image(s) pre render
 * @returns {void}
 * @param url
 */
const setImageSrc = url => {
  const img = new Image();
  img.src = url;
};

const usePreloadMediaImages = urls => {
  // If ServerSideRendering (SSR) is required elsewhere we
  // should move this line to an utils file.
  const isSSR = typeof window === 'undefined';
  if (isSSR) return;

  if (typeof urls === 'object' && urls?.length > 0) {
    urls.forEach(url => {
      setImageSrc(url);
    });
  }
  if (typeof urls === 'string') {
    setImageSrc(urls);
  }
};

export default usePreloadMediaImages;
