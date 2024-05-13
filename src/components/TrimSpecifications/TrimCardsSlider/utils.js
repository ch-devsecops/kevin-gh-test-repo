/**
 * gets name of the specification PDF file from the url
 *
 * @param {string} url - The absolute url from the pdf file from sitecore
 * @returns {string} - The PDF file name
 */
const getSpecificationsPDFFileName = url => {
  if (!url) return '';
  const urlPaths = url?.split('/');
  const PDFUrl = urlPaths?.[urlPaths.length - 1];
  const PDFFileName = PDFUrl?.split('?')?.[0];
  return PDFFileName;
};

export default getSpecificationsPDFFileName;

/**
 * gets name of trims details from the url
 *
 * @param {string} urlPath - The model navigation Items url from sitecore
 * @returns {string} - The trims param name
 */
export const getTrimDetailsName = urlPath => {
  if (!urlPath) return '';
  const items = urlPath?.[0]?.url?.split('/');
  const urlParamName = items?.[items.length - 1];
  return urlParamName;
};

export const isDownloadCtaValid = cta => !!cta?.item?.value?.text && !!cta?.item?.value?.href?.trim();
