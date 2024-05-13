/**
 * Transforms the params from sitecore cms into proper css margin values
 * @param params
 * @return {object}
 */
export default function getContentMargins(params = {}) {
  const keys = Object.keys(params);

  const ret = keys.reduce(
    (accumulator, value) => ({
      ...accumulator,
      [value]: '0',
    }),
    {},
  );

  keys.forEach(key => {
    const param = params[key];
    if (typeof param === 'string' || typeof param === 'number') {
      if (typeof param === 'string' && param.includes('-')) {
        ret[key] = param.replace('-', '').replace(/^/, '-');
      } else if (param && !Number.isNaN(param)) {
        ret[key] = param;
      }

      ret[key] = ret[key].concat('px');
    }
  });

  return ret;
}
