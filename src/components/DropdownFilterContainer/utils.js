import { gtmEvent } from '../../utils/gtmEvents';

/**
 * gets dropdown filter selected value
 * @param options {object} the dropdown option from the list
 * @param selection the selected option from the dropdown list
 */
export const getSelelectionValue = (options, selection) => {
  const option = options?.section?.[selection?.section];
  return option?.text?.toLowerCase();
};

/**
 *  pushes gtm event for submitting dropdown filter option
 * @param searchTerm {string} the search term
 */
export const pushGtmDropdownFilterEvent = searchTerm => {
  const gtmPayload = {
    event: 'search',
    search_type: 'oils and chemicals search',
    search_term: searchTerm,
  };
  gtmEvent(gtmPayload);
};
