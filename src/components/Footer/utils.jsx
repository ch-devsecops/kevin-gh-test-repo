import { getGtmTagValue } from '../../utils/gtmEvents';
import { wrapJSSFields } from '../../utils/wrapJSSFields';

export const getSection = (fields, section) => wrapJSSFields(fields)?.items?.find(item => item?.name === section);

const KEY_URL = 'url';
const KEY_ITEMS = 'items';
const KEY_CONTACT_INFORMATION = 'contactInformation';
const KEY_TEXT = 'label';
const KEY_SUBJECT = 'subject';
const KEY_BODY = 'body';

export const mapFooterItems = ({ name, displayName, fields }) => {
  if (!fields) return [];
  return Object.keys(fields).reduce((acc, key) => {
    acc.displayName = displayName;
    acc.name = name;
    if (key === KEY_URL && fields[key]?.field?.value?.href !== '') {
      acc[key] = fields[key]?.field?.value;
    } else if ([KEY_CONTACT_INFORMATION].indexOf(key) !== -1 && fields[key]?.value !== '') {
      acc[key] = fields[key]?.value;
    } else if ([KEY_TEXT].indexOf(key) !== -1 && fields[key]?.value !== '') {
      acc[key] = fields[key]?.value;
    } else if (key === KEY_ITEMS) {
      acc[key] = fields[key]?.map(mapFooterItems);
    } else if ([KEY_SUBJECT].indexOf(key) !== -1 && fields[key]?.value !== '') {
      acc[key] = fields[key]?.value;
    } else if ([KEY_BODY].indexOf(key) !== -1 && fields[key]?.value !== '') {
      acc[key] = fields[key]?.value;
    }
    return acc;
  }, {});
};

/** *
 * it constructs anchor attributes based on url params from sitecore cms-url field
 * @param url
 * @returns {{href: string, target: string}}
 */
export const getAnchorAttributes = (url = {}, subject = '', body = '') => {
  switch (url?.linktype) {
    case 'mailto':
      return {
        href: url?.href && `${url?.href.replace(/\?subject.*$/, '')}?subject=${subject}&body=${body}`,
        target: undefined,
      };
    default:
      return { href: url?.href, target: url?.target };
  }
};

export const getFooterGtmTags = label =>
  Object.freeze({
    'data-gtm-nav-type': 'footer',
    'data-tracking-label': getGtmTagValue(label),
  });
